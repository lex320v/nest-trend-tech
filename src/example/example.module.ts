import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/example.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Example.name, schema: ExampleSchema },
    ]),
  ],
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
