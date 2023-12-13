import { Employee } from "src/employees/entities/employee.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

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
  })
  employee: Employee;
}

