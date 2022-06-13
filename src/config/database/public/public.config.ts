import { TenantEntity } from '@/src/modules/public/tenant/entities/tenant.entity';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseConfig } from '../database.config';

export const DatabasePublicConfig = {
  ...DatabaseConfig,
  schema: 'public',
  models: [TenantEntity],
};

export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      ...DatabasePublicConfig,
    });

    await sequelize.sync();
    return sequelize;
  },
};
