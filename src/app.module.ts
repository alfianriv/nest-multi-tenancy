import { Module } from '@nestjs/common';
import { PublicModule } from './config/database/public/public.module';
import { TenancyModule } from './config/database/tenancy/tenancy.module';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { EmployeeModule } from './modules/tenancy/employee/employee.module';

@Module({
  imports: [PublicModule, TenancyModule, TenantModule, EmployeeModule],
})
export class AppModule {}
