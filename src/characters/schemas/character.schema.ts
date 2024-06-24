import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Character extends Document {
  @Prop() id: number;
  @Prop() name: string;
  @Prop() status: string;
  @Prop() species: string;
  @Prop() type: string;
  @Prop() gender: string;

  @Prop({ type: Object }) origin: Record<string, any>;
  @Prop({ type: Object }) location: Record<string, any>;

  @Prop() image: string;
  @Prop() episode: string[];
  @Prop() url: string;
  @Prop() created: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
