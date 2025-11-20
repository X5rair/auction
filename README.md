# 🏷️ Auction – State Pattern Auction Simulator

This project is a simple demonstration of an auction system built using the **State Design Pattern**.
Each product can exist in several states (in stock, for sale, in auction, sold), and all actions are handled by the corresponding strategy.

The project is written in **TypeScript/JavaScript**, has a modular structure, and is easy to extend.

---

## 🚀 Features

* 📦 **Multiple product types** (car, doll, chess, cards, shashki/checkers)
* 🔄 **Product states implemented via strategy classes:**

  * `InStock`
  * `ForSale`
  * `Auction`
  * `Sold`
* 💰 Auction actions:

  * Start auction
  * Raise price
  * End auction and assign winner
  * Put product up for sale / remove from sale
* 🖥️ Basic DOM rendering for product display

---

## 📁 Project Structure

```
auction/
└── src/
    ├── js/
    │   └── index.js           # Main UI/DOM logic
    ├── products/              # Product models
    │   ├── car.ts
    │   ├── chess.ts
    │   ├── doll.ts
    │   ├── cards.ts
    │   └── shashki.ts
    └── strategies/            # State strategy implementations
        ├── auctionStrategy.ts
        ├── forSaleStrategy.ts
        ├── inStockStrategy.ts
        └── soldStrategy.ts
```

---

## 🛠 Installation

```bash
git clone https://github.com/your-username/auction.git
cd auction
```

If you use TypeScript, install dependencies:

```bash
npm install
```

---

## ▶️ Running the Project

This project uses plain JavaScript (`src/js/index.js`), so you can run it directly in the browser.

1. Create an `index.html`
2. Include `index.js`
3. Open the HTML file in your browser

Example:

```html
<script src="./src/js/index.js"></script>
```

---

## 🧩 How the State Logic Works

Each product has methods like:

```ts
product.raisePrice(amount)
product.setUp()
product.setOff()
product.giveToTheWinner()
```

But how the product reacts depends on its current **state**.

Example:

```js
product.setUp();  
// If in ForSale state — starts auction
// If already Sold — action is blocked
```

---

## 📌 Example Usage

```js
const product = getProductById(1);

product.setUp();          // start auction
product.raisePrice(500);  // raise price
product.giveToTheWinner();// finish auction
```

---

## 🤝 Contributing

Pull requests are welcome!
You can easily add new product types or states thanks to the modular architecture.

---

## 📄 License

MIT License

