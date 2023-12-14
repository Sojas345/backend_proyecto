import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;
    @IsNotEmpty()
    @IsString ()
    nombre: string;
    @IsNotEmpty()
    @IsString ()
    descripcion: string;
    @IsNotEmpty()
    @IsString ()
    @IsOptional()
    cedula?: number;
    @IsNotEmpty()
    @IsString()
    fechaAsignacion: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    vidaUtil: number;
}
