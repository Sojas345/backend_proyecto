import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { assert } from 'console';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createAssetDto: CreateAssetDto, user: UserActiveInterface) {
    const employee = await this.employeeRepository.findOneBy({
      cedula: createAssetDto.cedula,
    });

    if (!employee) {
      throw new BadRequestException('Empleado no encontrado');
    }

    return await this.assetRepository.save({
      ...createAssetDto,
      employee: employee,
      correoUsuario: user.correoUsuario,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.assetRepository.find();
    }
    return await this.assetRepository.find({
      where: { correoUsuario: user.correoUsuario },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const asset = await this.assetRepository.findOneBy({ id });

    if (!asset) {
      throw new BadRequestException(`Activo no encontrado`);
    }

    this.validateOwnership(asset, user);

    return asset;
  }

  async update(
    id: number,
    updateAssetDto: UpdateAssetDto,
    user: UserActiveInterface,
  ) {
    const asset = await this.findOne(id, user);
    if (!asset) {
      throw new NotFoundException('Asset no encontrado');
    }
  
    let employee;
    if (updateAssetDto.cedula) {
      employee = await this.validateAsset(updateAssetDto.cedula);
      if (!employee) {
        throw new NotFoundException('Empleado no encontrado');
      }
      delete updateAssetDto.cedula; // Elimina la propiedad cedula del DTO
    }
  
    return await this.assetRepository.update(id, {
      ...updateAssetDto,
      employee: employee,
      correoUsuario: user.correoUsuario,
    });
  }

  async remove(id: number, user: UserActiveInterface) {
     await this.findOne( id , user);
    return await this.assetRepository.softDelete({ id });
  }

  private validateOwnership(asset: Asset, user: UserActiveInterface) {
    if (
      user.role !== Role.ADMIN &&
      asset.correoUsuario !== user.correoUsuario
    ) {
      throw new BadRequestException('No tienes permisos para ver este activo');
    }
  }

  async validateAsset(cedula: string): Promise<Employee> {
    const cedulaNumber = Number(cedula);
    const employee = await this.employeeRepository.findOne({
      where: { cedula: cedulaNumber },
    });
    if (!employee) {
      throw new BadRequestException('Empleado no encontrado');
    }
    return employee;
  }

  //   if (!employeeEntity) {
  //     throw new BadRequestException('Empleado no encontrado');
  //   }
  //   return employeeEntity;
  // }
}
