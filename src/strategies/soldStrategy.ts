import { AuctionStrategy } from './auctionStrategy';

export class SoldStrategy implements AuctionStrategy {
    raisePrice(amount: number): void {
        console.log("уже продано");
    }

    setUp(): void {
        console.log("уже продано");
    }

    setOff(): void {
        console.log("нельзя снять с товаров проданный товар");
    }

    giveToTheWinner(): void {
        console.log("продано");
    }
}

