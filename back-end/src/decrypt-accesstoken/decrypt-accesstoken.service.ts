import { Injectable } from '@nestjs/common';

@Injectable()
export class DecryptAccesstokenService {
    getUserFromAccessToken(accessToken: string): any {
        try {
            const jwtParts = accessToken.split('.');

            if (jwtParts.length !== 3) {
                throw new Error('Invalid Access Token');
            }

            const encodedPayload = jwtParts[1];
            const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
            const user = JSON.parse(decodedPayload);
            return user;
        } catch (error) {
            throw new Error('Invalid Access Token');
        }
    }
}
