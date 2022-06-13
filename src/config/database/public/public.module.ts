import { Module } from '@nestjs/common';
import { databaseProvider } from './public.config';

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class PublicModule {}
