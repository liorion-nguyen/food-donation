import { IsString, IsNotEmpty } from "class-validator";

export class PaymentrecordDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    imgTitle: string;

    @IsString()
    @IsNotEmpty()
    MoneyUsed: number;

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
}