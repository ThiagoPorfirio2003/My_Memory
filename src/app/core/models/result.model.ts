import { enumDifficulties } from "../enums/difficulties";

export interface MyResult
{
    playerUID : string;
    playerName : string;
    gameDurationMs : number;
    gameDifficulty : enumDifficulties;
    UID : string;
}