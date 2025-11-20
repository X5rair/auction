import { AuctionStrategy } from '../strategies/auctionStrategy';
import { InStockStrategy } from '../strategies/inStockStrategy';

export class Product1 {
    private strategy: AuctionStrategy;
    private price: number;
    private honoraryCode: string | undefined;

    constructor(private id: number, private name: string) {
        this.strategy = new InStockStrategy();
        this.price = 0;
        this.honoraryCode = undefined;
    }

}
