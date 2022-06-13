import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class TenantEntity extends Model {
  @Column
  public name: string;

  @Unique
  @Column
  public code: string;
}
