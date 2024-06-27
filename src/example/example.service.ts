import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Example } from './schemas/example.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExampleService {
  constructor(@InjectModel(Example.name) private readonly exampleModel: Model<Example>) {}

  async example(search: string) {
    const result = await this.exampleModel.findOne({
      name: search,
    }).exec();
    if (!result) {
      throw new HttpException('incorrect search', HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
