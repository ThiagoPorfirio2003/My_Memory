import { enumDifficulties } from "../enums/difficulties";
import { enumProfile, enumSex } from "../enums/userProperties"

export interface MyUser
{
    uid: string,
    email : string,
    profile : enumProfile,
    sex : enumSex,
    userName : string;
}

export interface gameResult
{
    id : string;
    seconds : number;
    uidPlayer : string;
    playerName : string;
    difficulty : enumDifficulties;
}

export interface MyUserAccessData
{
    email : string,
    password: string
}