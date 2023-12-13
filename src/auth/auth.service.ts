import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    nombreUsuario,
    correoUsuario,
    contraseñaUsuario,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(correoUsuario);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return await this.usersService.create({
      nombreUsuario,
      correoUsuario,
      contraseñaUsuario: await bcryptjs.hash(contraseñaUsuario, 10),
    });
  }

  async login({ correoUsuario, contraseñaUsuario }: LoginDto) {
    const user = await this.usersService.findOneByEmail(correoUsuario);

    if (!user) {
      throw new UnauthorizedException('email incorrect');
    }

    const isPasswordValid = await bcryptjs.compare(
      contraseñaUsuario,
      user.contraseñaUsuario,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('password incorrect');
    }

    const payload = { correoUsuario: user.correoUsuario };

    const token = await this.jwtService.sign(payload);

    return {
      token,
      correoUsuario,
    };
  }
}
