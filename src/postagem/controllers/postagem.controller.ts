import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }


  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
      return this.postagemService.findById(id);
  }
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(Postagem);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(Postagem);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postagemService.delete(id).then(() => {});
  }
}
