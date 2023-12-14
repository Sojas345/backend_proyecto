
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateAssetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  codigo?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nombre?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  descripcion?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  cedula?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  fechaAsignacion?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  vidaUtil?: number;
}
