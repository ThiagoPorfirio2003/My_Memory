import { enumAnimal, enumFruit, enumTool } from "../enums/cardType";
import { enumDifficulties } from "../enums/difficulties";
import { enumGameState } from "../enums/game";
import { MyCard } from "../models/card.model";

export class MyGame
{
    public difficultie : enumDifficulties;
    public state : enumGameState;

    public cards : Array<MyCard>;
    public cardsChosen : Array<MyCard>;
    public correctPairsQuantity : number;

    constructor(cards : Array<MyCard>, difficultie : enumDifficulties)
    {
        this.difficultie = difficultie;
        this.state = enumGameState.WAITING;

        this.cards = cards;
        this.cardsChosen = new Array<MyCard>();
        this.correctPairsQuantity = 0;
    }

    public cleanGame()
    {
        this.state = enumGameState.WAITING;
        this.correctPairsQuantity = 0;
        this.cards.splice(0, this.cards.length);

        if(this.cardsChosen.length > 0)
        {
            this.cardsChosen.splice(0, this.cardsChosen.length);
        }
    }

    public selectCard(card : MyCard) : undefined | boolean
    {
        let areEqual : undefined | boolean;
        card.itsSelected = true;
        this.cardsChosen.push(card);

        if(this.cardsChosen.length == 2)
        {
            areEqual = this.analyzeCards();
            this.cardsChosen.splice(0,2);
        }

        return areEqual;
    }

    public static getGame(difficultie : enumDifficulties) : MyGame
    {
        let gamesCards : Array<MyCard>;
        let cardsSelected : Array<MyCard>;
        let cardQuantity : number;

        gamesCards = new Array<MyCard>();
        cardsSelected = MyGame.getCards(difficultie);
        cardQuantity = cardsSelected.length;

        for(let i : number =0; i < cardQuantity; i++)
        {
            cardsSelected.push({
                value: cardsSelected[i].value, 
                itsSelected: cardsSelected[i].itsSelected, 
                imgPath: cardsSelected[i].imgPath,
                showImg: cardsSelected[i].showImg
            });
        }

        cardQuantity*=2;
        
        for(let maxPosition : number = cardQuantity; maxPosition > 0; maxPosition--)
        {
            const cardSelectedPosition = Math.floor(Math.random() * (maxPosition - 0) + 0)
            gamesCards.push(
                {
                    value: cardsSelected[cardSelectedPosition].value, 
                    itsSelected: cardsSelected[cardSelectedPosition].itsSelected, 
                    imgPath: cardsSelected[cardSelectedPosition].imgPath,
                    showImg: cardsSelected[cardSelectedPosition].showImg
                });
            cardsSelected.splice(cardSelectedPosition, 1);
        }

        return new MyGame(gamesCards, enumDifficulties.EASY)
    }

    private analyzeCards() : boolean
    {
        let cardsAreEqual : boolean;

        cardsAreEqual = this.cardsChosen[0].value === this.cardsChosen[1].value;

        if(cardsAreEqual)
        {
            this.correctPairsQuantity++;

            if(this.correctPairsQuantity == this.cards.length / 2)
            {
                this.state = enumGameState.FINISHED;
            }
        }
        else
        {
            this.cardsChosen[0].itsSelected = false;
            this.cardsChosen[1].itsSelected = false;
        }

        return cardsAreEqual;
    }

    private static getCards(difficultie : enumDifficulties) : Array<MyCard>
    {
        let cards! : Array<MyCard>;
    
        switch(difficultie)
        {
            case enumDifficulties.EASY:
                cards = MyGame.getEasyCards();
                break;

            case enumDifficulties.NORMAL:
                cards = MyGame.getNormalCards();
                break;
            
            case enumDifficulties.HARD:
                cards = MyGame.getHardCards();
                break;
        }

        return cards
    }

    private static getEasyCards() : Array<MyCard>
    {
        return [
            { value: enumAnimal.CAT, imgPath: '../../../assets/images/animals/cat.png', itsSelected: false, showImg: false},
            { value: enumAnimal.ELEPHANT, imgPath: '../../../assets/images/animals/elephant.png', itsSelected: false, showImg: false},
            { value: enumAnimal.LION, imgPath: '../../../assets/images/animals/lion.png', itsSelected: false, showImg: false}
        ]
    }

    private static getNormalCards() : Array<MyCard>
    {
        return [
            { value: enumTool.DRILL, imgPath: '../../../assets/images/tools/drill.png', itsSelected: false, showImg: false},
            { value: enumTool.HAMMER, imgPath: '../../../assets/images/tools/hammer.png', itsSelected: false, showImg: false},
            { value: enumTool.MEASURING_TAPE, imgPath: '../../../assets/images/tools/measuringTape.png', itsSelected: false, showImg: false},
            { value: enumTool.SAW, imgPath: '../../../assets/images/tools/saw.png', itsSelected: false, showImg: false},
            { value: enumTool.SCREWDRIVER, imgPath: '../../../assets/images/tools/screwdriver.png', itsSelected: false, showImg: false},
        ]
    }

    private static getHardCards() : Array<MyCard>
    {
        return [
            { value: enumFruit.APPLE, imgPath: '../../../assets/images/fruits/apple.png', itsSelected: false, showImg: false },
            { value: enumFruit.BANANA, imgPath: '../../../assets/images/fruits/banana.png', itsSelected: false, showImg: false },
            { value: enumFruit.LEMON, imgPath: '../../../assets/images/fruits/lemon.png', itsSelected: false, showImg: false },
            { value: enumFruit.ORANGE, imgPath: '../../../assets/images/fruits/orange.png', itsSelected: false, showImg: false },
            { value: enumFruit.PEAR, imgPath: '../../../assets/images/fruits/pear.png', itsSelected: false, showImg: false },
            { value: enumFruit.PUMPKIN, imgPath: '../../../assets/images/fruits/pumpkin.png', itsSelected: false, showImg: false },
            { value: enumFruit.TOMATO, imgPath: '../../../assets/images/fruits/tomato.png', itsSelected: false, showImg: false },
            { value: enumFruit.WATERMELON, imgPath: '../../../assets/images/fruits/watermelon.png', itsSelected: false, showImg: false },
        ]
    }
}