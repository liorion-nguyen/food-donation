import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory/ability.factory';
import { DecryptAccesstokenService } from 'src/decrypt-accesstoken/decrypt-accesstoken.service';

@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilityModule { }
