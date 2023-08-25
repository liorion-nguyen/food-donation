import { IsString, IsNotEmpty, IsObject } from "class-validator";


interface Actions {
    likes: {
        like: Array<string>,
        love: Array<string>,
        haha: Array<string>,
        sad: Array<string>,
    },
    comments: Array<object>,
    shares: Array<string>,
}

export class PostmanagerDto {
    @IsString()
    @IsNotEmpty()
    imgTitle: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    rasing: number;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    author: string;

    @IsObject()
    actions: Actions;
}