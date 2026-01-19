import { Tema } from './entities/tema.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaService } from './services/tema.service';
import { TemaController } from '../postagem/controllers/tema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  providers: [TemaService],
  controllers: [TemaController],
  exports: [TypeOrmModule],
})
export class TemaModule {}
