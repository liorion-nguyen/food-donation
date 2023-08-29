export interface OrgId {
    Location: boolean;
    Postmanager: boolean;
    Paymentrecord: boolean;
    Reward: boolean;
}
export interface Information {
    Category: string;
    Subname: string;
    Work: string;
    Education: string;
    Live: string;
    Countryside: string;
    Relationship: string;
    Join: string;
    Web: string;
    Instagram: string;
    Facebook: string;
    Gender: string;
    Datebird: string;
}
export interface User {
    _id: string;
    username: string;
    password: string;
    fullname: string;
    contact: string;
    avatar: string;
    cover: string;
    bio: string;
    information: Information;
    isAdmin: boolean;
    orgId: OrgId;
    status: boolean;
}