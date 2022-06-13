import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class EmployeeEntity extends Model {
  @Column
  name: string;
}
