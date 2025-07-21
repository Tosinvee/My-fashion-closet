import { IsOptional, IsString } from 'class-validator';

export class UpdateClosetDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
