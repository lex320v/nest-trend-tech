import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Example } from './schemas/example.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(Example.name) private readonly exampleModel: Model<Example>) {}

  async example(search: string) {
    const a = await this.exampleModel.find().exec();
    console.log(a);

    return search;
  }
}
