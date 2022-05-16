class VendingMachine {
  constructor() {
    this.balance = 0;
    this.till = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
    this.change = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
    this.row = null;
    this.drink;

    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const tea = { name: "mugitya", price: 250, count: 7 };
    const cola = { name: "cola", price: 250, count: 7 };
    const cider = { name: "cider", price: 250, count: 7 };
    const greenTea = { name: "greenTea", price: 250, count: 7 };
    const water = { name: "water", price: 230, count: 7 };
    const redTea = { name: "redTea", price: 250, count: 7 };
    const beer = { name: "beer", price: 250, count: 7 };
    const wine = { name: "wine", price: 250, count: 7 };
    const monster = { name: "monster", price: 250, count: 7 };
    const yakult = { name: "yakult", price: 250, count: 7 };
    const calpis = { name: "calpis", price: 250, count: 7 };
    const potage = { name: "potage", price: 250, count: 7 };
    const latte = { name: "latte", price: 250, count: 7 };
    const fanta = { name: "fanta", price: 250, count: 0 };

    this.inventory = [
      [juice, coffee, tea, cola],
      [cider, greenTea, water, redTea],
      [beer, wine, monster, yakult],
      [calpis, potage, latte, fanta],
    ];
  }
  insertCoin(denomination) {
    if (Object.keys(this.till).includes(String(denomination))) {
      this.till[denomination]++;
      let result = 0;
      for (const coin in this.till) {
        result += this.till[coin] * Number(coin);
      }
      this.balance = result;
    } else {
      console.log("please insert japanese coin");
      throw new Error();
    }
  }
  serectRow(numRow) {
    if (this.inventory.length >= numRow && 0 < numRow) {
      this.row = this.inventory[numRow - 1];
      console.log(this.row);
    } else {
      console.log(`please serect row(1 - ${this.inventory.length})`);
      throw new Error();
    }
  }
  serectLine(numLine) {
    if (this.row.length >= numLine && 0 < numLine) {
      if (this.row) {
        this.drink = this.row[numLine - 1];
        if (this.drink.price <= this.balance && this.drink.count > 0) {
          console.log(this.row);
          console.log(this.inventory.map((array) => array[numLine - 1]));
          console.log(`Here is your ${this.drink.name}`);
          this.drink.count--;
          this.balance = this.balance - this.drink.price;
          for (const coin of [500, 100, 50, 10]) {
            while (this.balance >= coin) {
              this.change[coin]++;
              this.balance = this.balance - coin;
            }
          }
          console.log(this.change);
          this.balance = 0;
        } else {
          console.log(
            this.drink.count > 0 ? "No enough money" : "No enough stock"
          );
          this.balance = 0;
          throw new Error();
        }
      }
    } else {
      console.log(`please serect line(1 - ${this.row.length})`);
      throw new Error();
    }
  }
}

// module.exports = VendingMachine;
// export { VendingMachine };
window.VendingMachine = VendingMachine;
