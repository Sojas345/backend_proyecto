import { BadRequestException, Injectable } from '@nestjs/common';
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

    const employee = await this.employeeRepository.findOneBy({cedula: createAssetDto.cedula});
    if(!employee){
      throw new BadRequestException('Cedula no encontrada');
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
    return await this.assetRepository.findOneBy({id});
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    return await this.assetRepository.update(id, updateAssetDto);
  }

  async remove(id: number) {
    return await this.assetRepository.softDelete({id});
  }
}
