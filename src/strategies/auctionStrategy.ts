export interface AuctionStrategy {
    raisePrice(amount: number): void;
    setUp(): void;
    setOff(): void;
    giveToTheWinner(): void;
}

export class InStockStrategy implements AuctionStrategy {
    raisePrice(amount: number): void {
        console.log("продукт уже продается");
    }

    setUp(): void {
        console.log("торги начаты");
    }

    setOff(): void {
        console.log("продукт не участвует в торгах по этому снять не выйдет");
    }

    giveToTheWinner(): void {
        console.log("продукт не продается со склада");
    }
}


