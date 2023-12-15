import { User } from "../../users/entities/user.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Asset {
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  codigo: string;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
  @Column()
  fechaAsignacion: String;
  @Column()
  vidaUtil: number;

  @ManyToOne(() => Employee, (employee) => employee.id, {
    eager: true,
    nullable: true,
  })
  employee: Employee;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'email', referencedColumnName: 'correoUsuario',})
  user: User;

  @Column()
  correoUsuario: string;
}
