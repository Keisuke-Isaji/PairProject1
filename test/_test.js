const { default: axios } = require("axios");
const { expect } = require("chai");
const { conso } = require("../app.js");
const Poke = require("../poke.js");
const VendingMachine = require("../VendingMachine.js");

describe("test", () => {
  console.log(pokeData());
  console.log(Poke.pokemon);
  console.log(Poke);
  console.log("Poke.pokemon");
  it("should run test", () => {
    expect(2).to.equal(2);
  });
});
