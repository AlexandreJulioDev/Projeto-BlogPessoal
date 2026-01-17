import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }
  async findById(id: number): Promise<Postagem> {
    const Postagem = await this.postagemRepository.findOne({
      where: {
        id
      }  
    });

    if(!Postagem)
      throw new HttpException('Postagem nao encotrada!', HttpStatus.NOT_FOUND);

    return Postagem;
  }


  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`)
      },
    });
  }

  async create(Postagem: Postagem): Promise<Postagem>{
    return await this.postagemRepository.save(Postagem);
 }

  async update(Postagem: Postagem): Promise<Postagem> {
    const buscaPostagem: Postagem = await this.findById(Postagem.id);
    if(!buscaPostagem || !Postagem.id)
      throw new HttpException('Postagem nao encotrada!', HttpStatus.NOT_FOUND);
    
    return await this.postagemRepository.save(Postagem);
  }

  async delete(id: number): Promise<DeleteResult> {

    const buscaPostagem: Postagem = await this.findById(id);
    if(!buscaPostagem)
      throw new HttpException('Postagem nao encotrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.delete(id);
  }
}
