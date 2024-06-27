import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Example } from './schemas/example.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(Example.name) private readonly exampleModel: Model<Example>) {}

  example(search: string) {
    return this.exampleModel.findOne({
      name: search,
    }).exec();
  }
}
