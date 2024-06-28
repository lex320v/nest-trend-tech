import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Example {
  @Prop({ required: true })
  name: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
