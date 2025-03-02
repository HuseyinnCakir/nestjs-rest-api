import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOptionsService } from './meta-options.service';
import { MetaOption } from './meta-options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  exports: [MetaOptionsService],
  imports:[TypeOrmModule.forFeature([MetaOption])]
})
export class MetaOptionsModule {}
