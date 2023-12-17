import { Role } from "src/common/enums/rol.enum";
import { Column } from "typeorm";

export class CreateUserDto {
    id?: number;
    nombreUsuario?: string;
    correoUsuario?: string;
    contraseñaUsuario?: string;


}
