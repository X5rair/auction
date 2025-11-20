interface ProductState {
    raisePrice(amount: number): void;
    setUp(): void;
    setOff(): void;
    giveToTheWinner(): void;
}

class InStockState implements ProductState {
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

class ForSaleState implements ProductState {
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
        console.log("нельзя отдать товар даром");
    }
}

class SoldState implements ProductState {
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

class Product {
    private state: ProductState;
    private price: number;
    private honoraryCode: string | undefined;

    constructor(private id: number, private name: string) {
        this.state = new InStockState();
        this.price = 0;
        this.honoraryCode = undefined;
    }

    raisePrice(amount: number): void {
        this.state.raisePrice(amount);
        this.price += amount;
    }

    setUp(): void {
        this.state.setUp();
        this.state = new ForSaleState();
        if (this.price > 0) {
            this.honoraryCode = Generator.generateHonoraryCode(this.id, this.price);
        }
    }

    setOff(): void {
        this.state.setOff();
        this.state = new InStockState();
        this.price = 0;
        this.honoraryCode = undefined;
    }

    giveToTheWinner(): void {
        this.state.giveToTheWinner();
        this.state = new SoldState();
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getStateName(): string {
        return this.state.constructor.name;
    }

    getHonoraryCode(): string | undefined {
        return this.honoraryCode;
    }
}

class Generator {
    static calculateMD5Hash(input: string): string {
        return "MD5-" + Math.random().toString(36).substring(2);
    }

    static generateHonoraryCode(productId: number, price: number): string {
        let prefix: string;
        if (price >= 1000) {
            prefix = "gold";
        } else if (price >= 500 && price < 1000) {
            prefix = "silver";
        } else {
            prefix = "bronze";
        }
        const input = `${prefix}-${productId}`;
        return this.calculateMD5Hash(input);
    }
}

const products: Product[] = [
    new Product(1, "шашки"),
    new Product(2, "шахматы"),
    new Product(3, "карты"),
    new Product(4, "кукла"),
    new Product(5, "машинка"),
];

function displayProducts(products: Product[]): void {
    const tableBody = document.getElementById("product-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.getId()}</td>
            <td>${product.getName()}</td>
            <td>${product.getStateName()}</td>
            <td>${product.getPrice()}</td>
            <td>${product.getHonoraryCode() || "-"}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="setUp(${product.getId()})">выставить</button>
                <button class="btn btn-info btn-sm" onclick="raisePrice(${product.getId()})">поднять ценник</button>
                <button class="btn btn-success btn-sm" onclick="giveToTheWinner(${product.getId()})">выдать победителю</button>
                <button class="btn btn-danger btn-sm" onclick="setOff(${product.getId()})">снять/убрать</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function setUp(productId: number): void {
    const product = getProductById(productId);
    if (product) product.setUp();
    displayProducts(products);
}

function raisePrice(productId: number): void {
    const product = getProductById(productId);
    if (product) product.raisePrice(100);
    displayProducts(products);
}

function giveToTheWinner(productId: number): void {
    const product = getProductById(productId);
    if (product) product.giveToTheWinner();
    displayProducts(products);
}

function setOff(productId: number): void {
    const product = getProductById(productId);
    if (product) product.setOff();
    displayProducts(products);
}

function getProductById(productId: number): Product | undefined {
    return products.find(p => p.getId() === productId);
}

displayProducts(products);