import { AuctionStrategy } from './auctionStrategy';

export class InStockStrategy implements AuctionStrategy {
    raisePrice(amount: number): void {
        console.log("продукт уже продается");
    }

    setUp(): void {
        console.log("торги начаты");
    }

    setOff(): void {
        console.log("продукт не участвует в торгах поэтому снять не выйдет");
    }

    giveToTheWinner(): void {
        console.log("продукт не продается со склада");
    }
}
