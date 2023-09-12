import { IsString, IsNotEmpty } from "class-validator";

export class MessageAIDto {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}