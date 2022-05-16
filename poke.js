const { default: axios } = require("axios");

class Poke {
  constructor() {
    const pokeData = async () => {
      await axios("https://pokeapi.co/api/v2/pokemon/")
        .then((res) => res.data)
        .then((res2) => res2.results);
    };

    const urlArray = pokeData().map((item) => item.url);
    console.log("urlArray: ", urlArray);
    this.pokemon = "pikapika";
    this.url = urlArray;
  }
  //   async getPokemon() {
  //     const pokeAPI = await fetch("https://pokeapi.co/api/v2/pokemon/");
  //     return pokeAPI;
  //   }
}

module.exports = Poke;
