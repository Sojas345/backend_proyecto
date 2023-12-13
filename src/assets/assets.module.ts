import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), EmployeesModule],
  controllers: [AssetsController],
  providers: [AssetsService, EmployeesService],
})
export class AssetsModule {}
