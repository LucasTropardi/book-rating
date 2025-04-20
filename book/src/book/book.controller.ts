/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 🔓 PUBLIC: List all books
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  // 🔓 PUBLIC: Load a specific book
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  // 🔐 ADMIN: Create book
  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  create(@Body() dto: CreateBookDto, @Req() req) {
    return this.bookService.create(dto, req.user.login);
  }

  // 🔐 ADMIN: Update book
  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookService.update(id, dto);
  }

  // 🔐 ADMIN: Delete book
  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}
