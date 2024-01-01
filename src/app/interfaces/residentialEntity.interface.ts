import { User } from "./user.interface";

export interface residentialEntity{
    id?: string,
    residential? : string,
    purpose? : string,
    location? : string,
    region?: string,
    title?: string,
    description? : string,
    bathrooms? : number,
    bedrooms? : number,
    area? : number,
    photoUrl?: File,
    owner?: User,
    status?: string
}