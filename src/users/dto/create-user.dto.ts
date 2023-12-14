import { Role } from "src/common/enums/rol.enum";
import { Column } from "typeorm";

export class CreateUserDto {
    nombreUsuario?: string;
    correoUsuario?: string;
    contraseñaUsuario?: string;


}
