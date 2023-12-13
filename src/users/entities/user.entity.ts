import { Column, CreateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: "increment" })
  id: number;

  @Column()
  nombreUsuario: string;

  @Column({ unique: true, nullable: false })
  correoUsuario: string;

  @Column({nullable: false})
  contraseñaUsuario: string;

  @Column({default: 'user'})
  rol: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
