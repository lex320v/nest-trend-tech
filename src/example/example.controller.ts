import { Controller, Get, Query } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('example')
  example(@Query('search') search: string) {
    return this.exampleService.example(search);
  }
}
