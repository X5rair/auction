import { AuctionStrategy } from '../strategies/auctionStrategy';
import { SoldStrategy } from '../strategies/soldStrategy';

export class Product5 {
    private strategy: AuctionStrategy;
    private price: number;
    private honoraryCode: string | undefined;

    constructor(private id: number, private name: string) {
        this.strategy = new SoldStrategy();
        this.price = 0;
        this.honoraryCode = undefined;
    }

}
