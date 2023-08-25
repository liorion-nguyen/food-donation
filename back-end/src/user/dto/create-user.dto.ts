import { IsNotEmpty, IsString, IsBoolean, IsObject } from 'class-validator';

interface OrgId {
  Location: boolean;
  Postmanager: boolean;
  Paymentrecord: boolean;
  Reward: boolean;
}

interface Information {
  Category: string;
  Subname: string;
  Work: string;
  Education: string;
  Live: string;
  Countryside: string;
  Relationship: string;
  Join: string;
  Web: string;
  Instagram: string;
  Facebook: string;
  Gender: string;
  Datebird: string; 
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  avatar: string;

  @IsString()
  cover: string;

  @IsString()
  bio: string;

  @IsObject()
  information: Information;

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

