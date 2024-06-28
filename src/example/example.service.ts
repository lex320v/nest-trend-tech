import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Example } from './schemas/example.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name) private readonly exampleModel: Model<Example>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async example(search: string) {
    const result = await this.exampleModel.findOne({
      name: search,
    }).exec();
    if (!result) {
      throw new HttpException('incorrect search', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  createIndex() {
    return this.exampleModel.collection.createIndex(
      { name: 1 },
      { unique: true }
    );
  }

  deleteIndex() {
    return this.exampleModel.collection.dropIndex('name_1');
  }
}
