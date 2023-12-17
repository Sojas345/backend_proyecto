import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateUserDto{
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString({ message: 'Name should be a string' })
    nombreUsuario?: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    correoUsuario?: string;

    @IsOptional()
    @IsString({ message: 'Name should be a string' })
    contraseñaUsuario?: string;
}
