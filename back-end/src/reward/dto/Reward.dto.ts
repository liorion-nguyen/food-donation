import { IsString, IsNotEmpty } from "class-validator";

export class RewardDto {
    @IsString()
    @IsNotEmpty()
    imgInformation: string;

    @IsString()
    @IsNotEmpty()
    VoucherName: string;

    @IsString()
    @IsNotEmpty()
    VoucherCode: number;

    @IsString()
    @IsNotEmpty()
    ExpiredDate: string;

    @IsString()
    @IsNotEmpty()
    Description: string;

    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}