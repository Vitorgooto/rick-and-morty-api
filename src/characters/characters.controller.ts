import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CharactersService } from './character.service';
import { Character } from './schemas/character.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('fetch')
  async fetchCharacters(): Promise<Character[]> {
    return this.charactersService.fetchAndSaveCharacters();
  }

  @Get('fetch/:id')
  async fetchCharacterById(@Param('id') id: number): Promise<Character> {
    return this.charactersService.fetchCharacterById(id);
  }

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  async findAll(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Character> {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCharacterDto: Partial<Character>
  ): Promise<Character> {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Character> {
    return this.charactersService.remove(id);
  }
}
