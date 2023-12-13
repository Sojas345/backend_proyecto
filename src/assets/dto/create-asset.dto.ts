import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

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
    cedula: number;
    @IsNotEmpty()
    @IsString()
    fechaAsignacion: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    vidaUtil: number;
}
