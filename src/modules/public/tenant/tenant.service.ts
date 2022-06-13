import { DatabaseTenancyConfig } from '@/src/config/database/tenancy/tenancy.config';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  private repository: typeof TenantEntity;
  constructor(@Inject('SEQUELIZE') private readonly connection: Sequelize) {
    this.repository = connection.getRepository(TenantEntity);
  }

  async create(data: CreateTenantDto) {
    const tenant: any = data;
    tenant.code = await this.generateRandomCode();
    const saved = await this.repository.create(tenant);
    await this.createSchemaTenant(saved.code);
    return saved;
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.findOneById(id);
  }

  async update(id: number, data: UpdateTenantDto) {
    const tenant = await this.findOneById(id);
    await tenant.update(data);
    return tenant;
  }

  async remove(id: number) {
    const tenant = await this.findOneById(id);
    await tenant.destroy();
    return { success: true };
  }

  async findOneById(id: number) {
    const tenant = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!tenant) throw new NotFoundException(`Tenant with id ${id} not found`);

    return tenant;
  }

  randomString(length) {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  async generateRandomCode() {
    const code = this.randomString(6);

    const tenant = await this.repository.count({
      where: {
        code: code,
      },
    });

    if (tenant > 0) {
      return this.generateRandomCode();
    }

    return code;
  }

  async createSchemaTenant(code): Promise<void> {
    await this.connection.createSchema(`tenant_${code}`, {});

    const connection = new Sequelize({
      ...DatabaseTenancyConfig(code),
    });

    await connection.sync();
  }
}
