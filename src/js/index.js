var InStockState = /** @class */ (function () {
    function InStockState() {
    }
    InStockState.prototype.raisePrice = function (amount) {
        console.log("продукт уже продается");
    };

    InStockState.prototype.setUp = function () {
        console.log("торги начаты");
    };
    InStockState.prototype.setOff = function () {
        console.log("продукт не участвует в торгах по этому снять не выйдет");
    };
    InStockState.prototype.giveToTheWinner = function () {
        console.log("продукт не продается со склада");
    };
    return InStockState;
}());
var ForSaleState = /** @class */ (function () {
    function ForSaleState() {
    }
    ForSaleState.prototype.raisePrice = function (amount) {
        console.log("\u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0430 \u0446\u0435\u043D\u0430 \u043D\u0430 ".concat(amount, " \u0431\u0430\u043A\u0441\u043E\u0432"));
    };
    ForSaleState.prototype.setUp = function () {
        console.log("продукт повторно не продается");
    };
    ForSaleState.prototype.setOff = function () {
        console.log("возвращение продукта/товара...");
    };
    ForSaleState.prototype.giveToTheWinner = function () {
        console.log("нельзя отдать товар даром");
    };
    return ForSaleState;
}());
var SoldState = /** @class */ (function () {
    function SoldState() {
    }
    SoldState.prototype.raisePrice = function (amount) {
        console.log("уже продано");
    };
    SoldState.prototype.setUp = function () {
        console.log("уже продано");
    };
    SoldState.prototype.setOff = function () {
        console.log("нельзя снять с товаров проданный товар");
    };
    SoldState.prototype.giveToTheWinner = function () {
        console.log("продано");
    };
    return SoldState;
}());
var Product = /** @class */ (function () {
    function Product(id, name) {
        this.id = id;
        this.name = name;
        this.state = new InStockState();
        this.price = 0;
        this.honoraryCode = undefined;
    }
    Product.prototype.raisePrice = function (amount) {
        this.state.raisePrice(amount);
        this.price += amount;
    };
    Product.prototype.setUp = function () {
        this.state.setUp();
        this.state = new ForSaleState();
        if (this.price > 0) {
            this.honoraryCode = Generator.generateHonoraryCode(this.id, this.price);
        }
    };
    Product.prototype.setOff = function () {
        this.state.setOff();
        this.state = new InStockState();
        this.price = 0;
        this.honoraryCode = undefined;
    };
    Product.prototype.giveToTheWinner = function () {
        this.state.giveToTheWinner();
        this.state = new SoldState();
    };
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.getStateName = function () {
        return this.state.constructor.name;
    };
    Product.prototype.getHonoraryCode = function () {
        return this.honoraryCode;
    };
    return Product;
}());
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.calculateMD5Hash = function (input) {
        return "MD5-" + Math.random().toString(36).substring(2);
    };
    Generator.generateHonoraryCode = function (productId, price) {
        var prefix;
        if (price >= 1000) {
            prefix = "gold";
        }
        else if (price >= 500 && price < 1000) {
            prefix = "silver";
        }
        else {
            prefix = "bronze";
        }
        var input = "".concat(prefix, "-").concat(productId);
        return this.calculateMD5Hash(input);
    };
    return Generator;
}());
var products = [
    new Product(1, "шашки"),
    new Product(2, "шахматы"),
    new Product(3, "карты"),
    new Product(4, "кукла"),
    new Product(5, "машинка"),
];
function displayProducts(products) {
    var tableBody = document.getElementById("product-table-body");
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    products.forEach(function (product) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(product.getId(), "</td>\n            <td>").concat(product.getName(), "</td>\n            <td>").concat(product.getStateName(), "</td>\n            <td>").concat(product.getPrice(), "</td>\n            <td>").concat(product.getHonoraryCode() || "-", "</td>\n            <td>\n                <button class=\"btn btn-primary btn-sm\" onclick=\"setUp(").concat(product.getId(), ")\">\u0432\u044B\u0441\u0442\u0430\u0432\u0438\u0442\u044C</button>\n                <button class=\"btn btn-info btn-sm\" onclick=\"raisePrice(").concat(product.getId(), ")\">\u043F\u043E\u0434\u043D\u044F\u0442\u044C \u0446\u0435\u043D\u043D\u0438\u043A</button>\n                <button class=\"btn btn-success btn-sm\" onclick=\"giveToTheWinner(").concat(product.getId(), ")\">\u0432\u044B\u0434\u0430\u0442\u044C \u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044E</button>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"setOff(").concat(product.getId(), ")\">\u0441\u043D\u044F\u0442\u044C/\u0443\u0431\u0440\u0430\u0442\u044C</button>\n            </td>\n        ");
        tableBody.appendChild(row);
    });
}
function setUp(productId) {
    var product = getProductById(productId);
    if (product)
        product.setUp();
    displayProducts(products);
}
function raisePrice(productId) {
    var product = getProductById(productId);
    if (product)
        product.raisePrice(100);
    displayProducts(products);
}

function giveToTheWinner(productId) {
    var product = getProductById(productId);
    if (product)
        product.giveToTheWinner();
    displayProducts(products);
}
function setOff(productId) {
    var product = getProductById(productId);
    if (product)
        product.setOff();
    displayProducts(products);
}
function getProductById(productId) {
    return products.find(function (p) { return p.getId() === productId; });
}
displayProducts(products);
