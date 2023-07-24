import { IsString, IsNotEmpty } from "class-validator";

export class RewardDto {
    @IsString()
    @IsNotEmpty()
    imgInformation: string;

    @IsString()
    @IsNotEmpty()
    Information: string;

    @IsString()
    @IsNotEmpty()
    expiredDate: string;

    @IsString()
    @IsNotEmpty()
    activeDate: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}