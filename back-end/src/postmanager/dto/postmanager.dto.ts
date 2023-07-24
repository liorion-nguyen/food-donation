import { IsString, IsNotEmpty } from "class-validator";

export class PostmanagerDto {
    @IsString()
    @IsNotEmpty()
    imgTitle: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsString()
    @IsNotEmpty()
    view: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}