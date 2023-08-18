import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "../ability/ability.factory/ability.factory";
import { CHECK_ABILITY, RequiredRule } from "../ability/abilities.decorator";
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
        
        if (request.route.path !== '/postmanagers' && request.route.path !== '/paymentrecords' && request.route.path !== '/users' && request.route.path !== '/rewards' && request.route.path !== '/locations') {
            return true;
        }
        else if (accessToken || accessToken !== undefined) {
            
            try {
                const jwtParts = accessToken.split('.');
                
                
                if (jwtParts.length !== 3) {
                    throw new Error('Invalid Access Token');
                }

                const encodedPayload = jwtParts[1];
                const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
                const user = JSON.parse(decodedPayload);
                if (request.route.path === '/locations') {
                    const ability = this.caslAbilityfactory.defineAbilityLocation(user);
                    console.log(ability);
                    
                    try {
                        rules.forEach((rule) =>
                            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                        );
                        return true;
                    } catch (error) {
                        return false;
                    }
                } else if (request.route.path === '/postmanagers') {
                    const ability = this.caslAbilityfactory.defineAbilityPostmanager(user);
                    try {
                        rules.forEach((rule) =>
                            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                        );
                        return true;
                    } catch (error) {
                        return false;
                    }
                } else if (request.route.path === '/paymentrecords') {
                    const ability = this.caslAbilityfactory.defineAbilityPaymentrecord(user);
                    try {
                        rules.forEach((rule) =>
                            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                        );
                        return true;
                    } catch (error) {
                        return false;
                    }
                } else if (request.route.path === '/rewards') {
                    const ability = this.caslAbilityfactory.defineAbilityReward(user);
                    try {
                        rules.forEach((rule) =>
                            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                        );
                        return true;
                    } catch (error) {
                        return false;
                    }
                } else if (request.route.path === '/users') {
                    const ability = this.caslAbilityfactory.defineAbilityUser(user);
                    try {
                        rules.forEach((rule) =>
                            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
                        );
                        return true;
                    } catch (error) {
                        return false;
                    }
                } else {
                    return false;
                }
                
            } catch (error) {
                return false;
            }
        }
        else {
            return false;
        }
    }

}