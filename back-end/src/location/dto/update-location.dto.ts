import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsNotEmpty()
  imgAddress: string;
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  addedDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}