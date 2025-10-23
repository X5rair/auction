import { AuctionStrategy } from './auctionStrategy';

export class ForSaleStrategy implements AuctionStrategy {
    raisePrice(amount: number): void {
        console.log(`повышена цена на ${amount} баксов`);
    }

    setUp(): void {
        console.log("продукт повторно не продается");
    }

    setOff(): void {
        console.log("возвращение продукта/товара...");
    }

    giveToTheWinner(): void {
        console.log("нельзя отдать товары даром");
    }
}
