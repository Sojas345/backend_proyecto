import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MinLength, minLength } from "class-validator";
import { Role } from "src/common/enums/rol.enum";
import { Column } from "typeorm";

export class RegisterDto {
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsString()
    @MinLength(4)
    nombreUsuario: string;

    @IsEmail()
    correoUsuario: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    contraseñaUsuario: string;
}