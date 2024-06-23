import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { CharactersController } from './characters.controller';
import { CharactersService } from './character.service';
import { Character, CharacterSchema } from './schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    HttpModule
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
