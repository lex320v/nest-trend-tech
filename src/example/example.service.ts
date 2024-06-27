import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {

  example(search: string) {
    return search;
  }
}
