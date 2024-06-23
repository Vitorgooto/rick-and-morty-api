import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop() route: string;
  @Prop() method: string;
  @Prop() duration: number;
  @Prop() timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
