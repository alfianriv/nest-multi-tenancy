import { TenantEntity } from '@/src/modules/public/tenant/entities/tenant.entity';
import { EmployeeEntity } from '@/src/modules/tenancy/employee/entities/employee.entity';
import { BadRequestException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseConfig } from '../database.config';
import { DatabasePublicConfig } from '../public/public.config';

export const DatabaseTenancyConfig = (code) => ({
  ...DatabaseConfig,
  schema: `tenant_${code}`,
  models: [EmployeeEntity],
});

export const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  inject: [REQUEST],
  useFactory: async (req) => {
    const code = req.headers['x-tenant'];

    if (!code) {
      throw new BadRequestException('Tenant code is required');
    }

    const connectionPublic = new Sequelize({
      ...DatabasePublicConfig,
    });

    const found = await connectionPublic.getRepository(TenantEntity).findOne({
      where: {
        code,
      },
    });

    if (!found) {
      throw new BadRequestException('Tenant not found');
    }

    const sequelize = new Sequelize({
      ...DatabaseTenancyConfig(code),
    });

    return sequelize;
  },
};
