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

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    let employee = null;

    if (createAssetDto.cedula) {
      employee = await this.employeeRepository.findOneBy({
        cedula: createAssetDto.cedula,
      });
      if (!employee) {
        throw new BadRequestException('Cedula no encontrada');
      }
    }

    return await this.assetRepository.save({
      ...createAssetDto,
      employee,
    });
  }

  async findAll() {
    return await this.assetRepository.find();
  }

  async findOne(id: number) {
    return await this.assetRepository.findOneBy({ id });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    let employee = null;

    if (updateAssetDto.cedula) {
      const cedula = Number(updateAssetDto.cedula);
      employee = await this.employeeRepository.findOne({ where: { cedula } });
      if (!employee) {
        throw new BadRequestException('Cedula no encontrada');
      }
    }

    const { cedula, ...updateDto } = updateAssetDto;

    const updatedAsset = await this.assetRepository.preload({
      id: +id,
      ...updateDto,
      employee,
    });

    if (!updatedAsset) {
      throw new NotFoundException(`Asset #${id} not found`);
    }

    return this.assetRepository.save(updatedAsset);
  }

  async remove(id: number) {
    return await this.assetRepository.softDelete({ id });
  }
}
