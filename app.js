// const { VendingMachine } = require("./VendingMachine");

// const VendingMachine = require("./VendingMachine.js");
// import { VendingMachine } from "./VendingMachine.js";

let machine = new VendingMachine();

async function pokemonGetter() {
  const pokeData = await fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((res1) => res1.json())
    .then((res2) => res2.results);
  const urlArray = pokeData.map((item) => item.url);
  const pokemonData2 = await Promise.all(urlArray.map((url) => fetch(url)));
  const pokemonData3 = await Promise.all(
    pokemonData2.map((data) => data.json())
  );
  //   console.log("pokemonData3: ", pokemonData3);

  return pokemonData3;
}

async function frontImageGetter() {
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
  //   console.log(machine.till);
  const imageArea = document.getElementById("pokeimage");
  for (const pokemon of pokemonData5) {
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
function insertMoney(num) {}

frontImageGetter();

// module.exports = { conso };
