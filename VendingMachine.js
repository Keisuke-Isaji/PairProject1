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
    this.inventory;
  }
  async pokemonGetter() {
    const result = [];
    const preResult = [];
    const pokeData = await fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res1) => res1.json())
      .then((res2) => res2.results);
    const urlArray = pokeData.map((item) => item.url);
    const pokemonData2 = await Promise.all(urlArray.map((url) => fetch(url)));
    const pokemonData3 = await Promise.all(
      pokemonData2.map((data) => data.json())
    );
    const pokemonData4 = await Promise.all(
      pokemonData3.map((poke) => poke.sprites)
    );
    const pokemonData5 = await Promise.all(
      pokemonData4.map((image) => image.front_default)
    );
    const pokemonNameArray = await Promise.all(
      pokemonData3.map((poke) => poke.name)
    );
    for (const name of pokemonNameArray) {
      preResult.push({ name });
    }
    // console.log("pokemonData5: ", pokemonData5);
    for (let i = 0; i < preResult.length; i++) {
      preResult[i].url = pokemonData5[i];
    }
    for (const poke of preResult) {
      const randomPrice = String(Math.floor(Math.random() * 10000) + 100);
      poke.price = randomPrice;
    }
    for (let n = 0; n < preResult.length; n += 5) {
      result.push(preResult.slice(n, n + 5));
    }
    console.log("result: ", result);
    this.inventory = result;
    // console.log("this.inventory: ", this.inventory);
    console.log("result: ", result);
    return result;
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
export { VendingMachine };
