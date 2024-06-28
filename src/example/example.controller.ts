import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  example(@Query('search') search: string) {
    return this.exampleService.example(search);
  }

  @Post('index')
  createIndex() {
    return this.exampleService.createIndex();
  }

  @Delete('index')
  deleteIndex() {
    return this.exampleService.deleteIndex();
  }
}
