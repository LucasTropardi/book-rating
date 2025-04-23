/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto, login: string) {
    const book = this.bookRepo.create({
      ...dto,
      imagem: dto.imagem ? Buffer.from(dto.imagem, 'base64') : undefined,
      criadoPor: login,
    });
    return this.bookRepo.save(book);
  }

  async findAll() {
    const books = await this.bookRepo.find();
    return books.map((book) => ({
      ...book,
      imagem: book.imagem
        ? `data:image/png;base64,${book.imagem.toString('base64')}`
        : null,
    }));
  }
  
  async findOne(id: number) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) return null;
  
    return {
      ...book,
      imagem: book.imagem
        ? `data:image/png;base64,${book.imagem.toString('base64')}`
        : null,
    };
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) return null;
    if (dto.imagem) {
      dto.imagem = Buffer.from(dto.imagem, 'base64') as any;
    }
    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
