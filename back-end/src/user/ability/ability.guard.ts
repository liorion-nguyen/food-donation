import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "./ability.factory/ability.factory";
import { CHECK_ABILITY, RequiredRule } from "./abilities.decorator";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityfactory: AbilityFactory,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules =
            this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers['authorization'];
        
        if (accessToken || accessToken !== undefined) {
            try {
                const jwtParts = accessToken.split('.');
    
                if (jwtParts.length !== 3) {
                    throw new Error('Invalid Access Token');
                }
    
                const encodedPayload = jwtParts[1];
                const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
                const user = JSON.parse(decodedPayload);
                
                const ability = this.caslAbilityfactory.defineAbility(user);
                
                try {
                    rules.forEach((rule) =>
                        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                    );
                    return true;
                } catch (error) {
                    return false;
                }
            } catch (error) {
                return false;
            }
        }
        else {
            return true;
        }
    }

}