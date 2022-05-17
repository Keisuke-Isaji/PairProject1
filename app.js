import { VendingMachine } from "./VendingMachine.js";

let machine = new VendingMachine();

async function run() {
  await machine.pokemonGetter();

  console.log(machine);
  console.log(machine.balance);
  console.log("machine.inventory: ", machine.inventory);
  async function frontImageGetter() {
    const pokeData = machine.inventory.flat();
    console.log("pokeData: ", pokeData);

    const urlArray = pokeData.map((item) => item.url);
    console.log("urlArray: ", urlArray);

    const imageArea = document.getElementById("pokeimage");
    for (const pokemon of urlArray) {
      // それぞれのポケモンのタグ作成
      const eachPokemon = document.createElement("div");
      // 写真部分
      const newImageArea = document.createElement("img");
      eachPokemon.className = "poke";
      newImageArea.src = pokemon;
      newImageArea.alt = "NO IMAGE";
      eachPokemon.appendChild(newImageArea);
      // 価格部分
      const priceArea = document.createElement("p");
      priceArea.className = "price";
      const randomPrice = String(Math.floor(Math.random() * 10000) + 100);
      console.log("randomPrice: ", randomPrice);
      priceArea.innerText = `$ ${randomPrice}`;
      eachPokemon.appendChild(priceArea);
      // 購入ボタン部分
      const buttonArea = document.createElement("button");
      buttonArea.className = "price";
      buttonArea.innerText = "購入";
      eachPokemon.appendChild(buttonArea);
      // まとめたdivタグを自販機に挿入
      imageArea.appendChild(eachPokemon);
    }
  }
  frontImageGetter();
}
run();

function moneyIncert() {
  machine.insertCoin(500);
  document.getElementById("nowmoney").innerText = machine.balance;
}

document.getElementById("insertmoney").addEventListener("click", moneyIncert);

function alertPoke() {
  window.alert("ポケモンをお金で買うなんて信じられない！");
}

document
  .getElementsByClassName("price")[0]
  .addEventListener("click", alertPoke);
