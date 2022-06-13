import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { PublicModule } from '@/src/config/database/public/public.module';

@Module({
  imports: [PublicModule],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
