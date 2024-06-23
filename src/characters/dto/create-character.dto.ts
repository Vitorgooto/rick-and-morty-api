import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  species: string;

  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  // Adicione outros campos conforme necessário
}
