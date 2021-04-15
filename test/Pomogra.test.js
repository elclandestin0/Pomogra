const assert = require("assert");

// for our local test network
const ganache = require("ganache-cli");

// creating web3 and injecting it with a ganache provider
const Web3 = require("web3");
const ganacheProvider = ganache.provider();
const web3 = new Web3(ganacheProvider);

// finding path of our pomogra artifact
const path = require("path");
const pomograPath = path.resolve(
  __dirname,
  "..",
  "ethereum",
  "artifacts",
  "contracts",
  "Pomogra.sol",
  "Pomogra.json"
);

// file streamer to read the JSON file of Pomogra.json
const fs = require("fs");
const compiledPomogra = fs.readFileSync(pomograPath, "utf8");

// accounts from ganache to be assigned later
let accounts;

// pomogra contract to be assigned by web3 later
let pomogra;

// before we begin our tests, we need to deploy our
// pomogra contract.
beforeEach(async () => {
  // get all ganache accounts
  accounts = await web3.eth.getAccounts();

  // create the pomogra contract
  pomogra = await new web3.eth.Contract(JSON.parse(compiledPomogra).abi)
    .deploy({ data: JSON.parse(compiledPomogra).bytecode })
    .send({ from: accounts[0], gas: "5555555" });
});

// begin tests
describe("Pomogra test", () => {
  it("deploys the contract", () => {
    // assert if contract deployed
    assert.ok(pomogra.options.address);
  });
  it("adds a paper", async () => {
    await pomogra.methods
      .addPaper("Test", 2)
      .send({ from: accounts[0], gas: "5555555" });
    const chain = await pomogra.methods.chain().call();
    // assert that owner of first paper is = to the accounts[0]
    assert.equal(chain[0].owner, accounts[0]);
  });
  it("owner isn't added twice to _owners", async () => {
    // add first paper from owner
    await pomogra.methods
      .addPaper("Test One", 2)
      .send({ from: accounts[0], gas: "5555555" });

    // add second paper from same owner
    await pomogra.methods
      .addPaper("Test Two", 2)
      .send({ from: accounts[0], gas: "5555555" });

    // check if owners array length equate to 1
    const owners = await pomogra.methods.owners().call();
    assert.equal(owners.length, 1);
  });
});
