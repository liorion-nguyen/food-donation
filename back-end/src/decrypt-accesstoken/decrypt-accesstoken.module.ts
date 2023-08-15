import { Module } from '@nestjs/common';
import { DecryptAccesstokenController } from './decrypt-accesstoken.controller';
import { DecryptAccesstokenService } from './decrypt-accesstoken.service';

@Module({
  controllers: [DecryptAccesstokenController],
  providers: [DecryptAccesstokenService]
})
export class DecryptAccesstokenModule {}
