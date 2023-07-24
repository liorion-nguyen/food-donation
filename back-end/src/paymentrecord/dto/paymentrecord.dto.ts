import { IsString, IsNotEmpty } from "class-validator";

export class PaymentrecordDto {
    @IsString()
    @IsNotEmpty()
    event: string;

    @IsString()
    @IsNotEmpty()
    imgEvent: string;

    @IsString()
    @IsNotEmpty()
    moneyUsed: string;

    @IsString()
    @IsNotEmpty()
    usedDate: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}