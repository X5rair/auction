import { AuctionStrategy } from '../strategies/auctionStrategy';
import { ForSaleStrategy } from '../strategies/forSaleStrategy';

export class Product2 {
    private strategy: AuctionStrategy;
    private price: number;
    private honoraryCode: string | undefined;

    constructor(private id: number, private name: string) {
        this.strategy = new ForSaleStrategy();
        this.price = 0;
        this.honoraryCode = undefined;
    }

}
