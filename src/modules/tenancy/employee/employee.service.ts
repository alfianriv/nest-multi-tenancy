import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  private repository: typeof EmployeeEntity;

  constructor(@Inject('CONNECTION') connection) {
    this.repository = connection.getRepository(EmployeeEntity);
  }

  create(data: CreateEmployeeDto) {
    const employee: any = data;
    return this.repository.create(employee);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.findOneById(id);
  }

  async update(id: number, data: UpdateEmployeeDto) {
    const employee = await this.findOneById(id);
    await employee.update(data);
    return employee;
  }

  async remove(id: number) {
    const employee = await this.findOneById(id);
    await employee.destroy();
    return { success: true };
  }

  async findOneById(id: number) {
    const employee = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!employee)
      throw new NotFoundException(`Employee with id ${id} not found`);

    return employee;
  }
}
