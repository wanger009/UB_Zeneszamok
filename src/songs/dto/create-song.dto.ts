import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  length: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}