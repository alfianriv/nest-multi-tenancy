import { Module } from '@nestjs/common';
import { connectionFactory } from './tenancy.config';

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class TenancyModule {}
