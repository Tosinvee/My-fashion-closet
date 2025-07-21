import { IsString } from 'class-validator';

export class ClosetItemDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsString()
  imageUrl: string;
}
