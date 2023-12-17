import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enums/rol.enum';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOneByEmail(correoUsuario: string) {
    return this.userRepository.findOneBy({ correoUsuario });
  }

  findByEmailWhitPassword(correoUsuario: string) {
    return this.userRepository.findOne({
      where: { correoUsuario },
      select: ['id', 'correoUsuario', 'contraseñaUsuario', 'role'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Actualiza propiedades del usuario con los datos de UpdateUserDto
    user.nombreUsuario = updateUserDto.nombreUsuario;
    user.correoUsuario = updateUserDto.correoUsuario;

    // Verifica si se proporcionó una nueva contraseña antes de encriptarla
    if (updateUserDto.contraseñaUsuario) {
      const hashedPassword = await bcryptjs.hash(updateUserDto.contraseñaUsuario, 10);
      user.contraseñaUsuario = hashedPassword;
    }

    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User deleted `);
    }

    return `User #${id} has been deleted`;
  }
}
