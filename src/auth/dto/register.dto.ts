import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, minLength } from "class-validator";

export class RegisterDto {
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