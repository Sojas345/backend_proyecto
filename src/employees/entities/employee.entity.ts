import { Asset } from "src/assets/entities/asset.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Employee {
  @Column({ primary: true, generated: "increment" })
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => Asset, (asset) => asset.employee)
  assets: Asset[];
}
