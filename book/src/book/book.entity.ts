/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  anoLancamento: number;

  @Column()
  qtdPaginas: number;

  @Column({ type: 'text' })
  sinopse: string;

  @Column({ type: 'bytea', nullable: true })
  imagem: Buffer;

  @Column()
  criadoPor: string;
}
