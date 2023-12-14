import { Role } from "../../common/enums/rol.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: "increment" })
  id: number;

  @Column()
  nombreUsuario: string;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({nullable: false, select: false})
  contraseñaUsuario: string;

  @Column({type: 'enum', default: Role.USER, enum: Role})
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
