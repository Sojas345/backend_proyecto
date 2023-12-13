import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    correoUsuario: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    contraseñaUsuario: string;
}