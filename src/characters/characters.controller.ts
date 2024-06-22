import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Character } from "./entities/character/character";
import { CharactersService } from "./entities/character/characters.service";

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

    @Post('fetch')
  async fetchCharacters(): Promise<Character[]> {
    return this.charactersService.fetchAndSaveCharacters();
  }

  @Post()
  async create(@Body() character: Character): Promise<Character> {
    return this.charactersService.create(character);
  }

  @Get()
  async findAll(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Character> {
    return this.charactersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() character: Character): Promise<Character> {
    return this.charactersService.update(id, character);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.charactersService.remove(id);
  }
}
