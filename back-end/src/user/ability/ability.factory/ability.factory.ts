import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbilityUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            cannot(Action.Read, User).because('Your special messege: only Admin!!');
            can(Action.Create, User)
            cannot(Action.Delete, User).because('Your cannot delete')
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        })
    }

    defineAbilityLocation(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            if (user.orgId.Location) {
                cannot(Action.Delete, User);
                cannot(Action.Create, User);
                can(Action.Read, User);
            }
            else {
                cannot(Action.Read, User).because('Your special messege: only Admin!!');
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        })
    }

    defineAbilityPostmanager(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            console.log("admin");

            can(Action.Manage, 'all');
        } else {
            if (user.orgId.Postmanager) {
                cannot(Action.Delete, User);
                cannot(Action.Create, User);
                can(Action.Read, User);
            }
            else {
                cannot(Action.Read, User).because('Your special messege: only Admin!!');
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        })
    }

    defineAbilityReward(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            if (user.orgId.Reward) {
                can(Action.Read, User)
            }
            else {
                cannot(Action.Read, User).because('Your special messege: only Admin!!');
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        })
    }

    defineAbilityPaymentrecord(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

        if (user.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            if (user.orgId.Paymentrecord) {
                can(Action.Read, User)
            }
            else {
                cannot(Action.Read, User).because('Your special messege: only Admin!!');
            }
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        })
    }
}
