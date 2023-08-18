import { IsNotEmpty, IsString, IsBoolean, IsObject } from 'class-validator';

interface OrgId {
  Location: boolean;
  Postmanager: boolean;
  Paymentrecord: boolean;
  Reward: boolean;
}
export class UpdateUserDto {
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

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsObject()
  @IsNotEmpty()
  orgId: OrgId;
}
