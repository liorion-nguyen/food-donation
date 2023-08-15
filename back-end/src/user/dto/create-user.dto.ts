import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsNumber()
  @IsNotEmpty()
  orgId: number;
}
