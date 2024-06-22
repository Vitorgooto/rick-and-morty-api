import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity'; 
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private httpService: HttpService
  ) {}

  async fetchAndSaveCharacters(): Promise<Character[]> {
    const response = await lastValueFrom(this.httpService.get('https://rickandmortyapi.com/api/character'));
    const characters = response.data.results.slice(0, 50);

    const characterEntities = characters.map(character => {
      const characterEntity = new Character();
      characterEntity.name = character.name;
      characterEntity.status = character.status;
      characterEntity.species = character.species;
      characterEntity.type = character.type;
      characterEntity.gender = character.gender;
      characterEntity.origin = character.origin.name;
      characterEntity.location = character.location.name;
      characterEntity.image = character.image;
      characterEntity.episode = character.episode.join(', ');

      return characterEntity;
    });

    return this.characterRepository.save(characterEntities);
  }

  // Métodos CRUD aqui
}
