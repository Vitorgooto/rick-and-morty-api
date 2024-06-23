import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Character } from './schemas/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<Character>,
    private httpService: HttpService
  ) {}

  async fetchAndSaveCharacters(): Promise<Character[]> {
    const response = await lastValueFrom(
      this.httpService.get('https://rickandmortyapi.com/api/character')
    );
    const charactersData = response.data.results.slice(0, 50);
    const characters = await this.characterModel.insertMany(charactersData);
    return characters.map(character => character.toObject() as Character);
  }

  async fetchCharacterById(id: number): Promise<Character> {
    const response = await lastValueFrom(
      this.httpService.get(`https://rickandmortyapi.com/api/character/${id}`)
    );
    return response.data;
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const newCharacter = new this.characterModel(createCharacterDto);
    return newCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: number): Promise<Character> {
    return this.characterModel.findOne({ id }).exec();
  }

  async update(id: number, updateCharacterDto: Partial<Character>): Promise<Character> {
    return this.characterModel.findOneAndUpdate({ id }, updateCharacterDto, { new: true }).exec();
  }

  async remove(id: number): Promise<Character> {
    return this.characterModel.findOneAndDelete({ id }).exec();
  }
}
