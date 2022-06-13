import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TenancyModule } from '@/src/config/database/tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
