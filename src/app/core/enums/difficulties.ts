export enum enumDifficulties
{
    EASY = 1,
    NORMAL, 
    HARD
}

export class classDifficuelties{
    
    public static toWord(value : enumDifficulties)
    {
        let retorno : string;

        switch(value)
        {
            case enumDifficulties.EASY:
                retorno = 'Facíl';
                break;

            case enumDifficulties.NORMAL:
                retorno = 'Normal'
                break;

            case enumDifficulties.HARD:
                retorno = 'Dificíl'
                break;
        }

        return retorno; 
    }
}