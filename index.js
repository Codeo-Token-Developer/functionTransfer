const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const express = require("express");
require("dotenv").config();

const app = express();
// Connect to the test network
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

app.get("/sendtx", function(req, res) {
  let PrivateKEY = {
    version: 3,
    id: "e1f0e2a7-ff29-4a86-96a0-efb01adb90e7",
    address: "8f4a0ebea683a7f8fcb60c6530dba0833a26f413",
    crypto: {
      ciphertext:
        "0fcdc32c8379f5fb2d0ce7ddcdca6cc7326344bad122afe61c000d72a7e98d8d",
      cipherparams: { iv: "4279b783790f60a7109c5c7944465193" },
      cipher: "aes-128-ctr",
      kdf: "scrypt",
      kdfparams: {
        dklen: 32,
        salt:
          "d060d0319fa190c54d6285338d846c7366e1a9e791b635eab4c2b9de940bb302",
        n: 8192,
        r: 8,
        p: 1
      },
      mac: "dc0cbc6c938392a0117437721af682080e0078c14c63e5ee69f496a2072ecc1f"
    }
  }; //account.key from data base

  let PRIVATE_KEY = web3js.eth.accounts.decrypt(
    PrivateKEY,
    process.env.ENCRYPT
  );
  let PriKey = PRIVATE_KEY.privateKey.slice(2);

  let myAddress = "0x8f4a0ebEa683a7f8Fcb60c6530DBA0833a26F413"; // adress pengguna
  let privateKey = Buffer.from(PriKey, "hex");
  let toAddress = "0x6505A7DB04147D52f51B039d7B36b6b8B1e6BB54"; // reg.body dari alamat yg di tuju

  //contract abi is the array that you can get from the ethereum wallet or etherscan
  let contractABI = [
    {
      constant: true,
      inputs: [{ name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "mintingFinished",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "transferAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "transferFrom",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOperator",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "account", type: "address" }],
      name: "removeMinter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "approveAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "cap",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "addedValue", type: "uint256" }
      ],
      name: "increaseAllowance",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ],
      name: "transferAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "mint",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "transferEnabled",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "account", type: "address" }],
      name: "isOperator",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "account", type: "address" },
        { name: "amount", type: "uint256" }
      ],
      name: "burnFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "finishMinting",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "tokenAddress", type: "address" },
        { name: "tokenAmount", type: "uint256" }
      ],
      name: "recoverERC20",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "account", type: "address" }],
      name: "addMinter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "renounceMinter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "account", type: "address" }],
      name: "addOperator",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "subtractedValue", type: "uint256" }
      ],
      name: "decreaseAllowance",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "account", type: "address" }],
      name: "isMinter",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "account", type: "address" }],
      name: "removeOperator",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "builtOn",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ],
      name: "transferFromAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ],
      name: "approveAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" }
      ],
      name: "transferFromAndCall",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" }
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [],
      name: "enableTransfer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        { name: "name", type: "string" },
        { name: "symbol", type: "string" },
        { name: "decimals", type: "uint8" },
        { name: "cap", type: "uint256" },
        { name: "initialSupply", type: "uint256" },
        { name: "transferEnabled", type: "bool" }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    { anonymous: false, inputs: [], name: "MintFinished", type: "event" },
    { anonymous: false, inputs: [], name: "TransferEnabled", type: "event" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "previousOwner", type: "address" },
        { indexed: true, name: "newOwner", type: "address" }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "account", type: "address" }],
      name: "OperatorAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "account", type: "address" }],
      name: "OperatorRemoved",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "account", type: "address" }],
      name: "MinterAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "account", type: "address" }],
      name: "MinterRemoved",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "spender", type: "address" },
        { indexed: false, name: "value", type: "uint256" }
      ],
      name: "Approval",
      type: "event"
    }
  ];

  let contractAddress = process.env.CODEO;

  //creating contract object
  var mytt = new web3js.eth.Contract(contractABI, contractAddress);

  let count;
  // get transaction count, later will used as nonce
  web3js.eth.getTransactionCount(myAddress).then(function(v) {
    console.log("Count: " + v);
    count = v;
    let howMuch = 4; // from front end how many token
    let change = howMuch * 1000000;
    let amoung = (change * 1000000000000).toString();
    let amount = web3js.utils.toHex(amoung);
    //creating raw tranaction
    let rawTransaction = {
      from: myAddress,
      gasPrice: web3js.utils.toHex(15 * 1e9),
      gasLimit: web3js.utils.toHex(40000),
      to: contractAddress,
      value: 0,
      data: mytt.methods.transfer(toAddress, amount).encodeABI(),
      nonce: web3js.utils.toHex(count)
    };
    console.log(rawTransaction);
    //creating tranaction via ethereumjs-tx
    let transaction = new Tx(rawTransaction);
    //signing transaction with private key
    transaction.sign(privateKey);
    //sending transacton via web3js module
    web3js.eth
      .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
      .on("transactionHash", console.log); //transactionHash = MASUK DI FRONT END YANG NOMOR TRANSAKSI

    mytt.methods
      .balanceOf(myAddress)
      .call()
      .then(function(balance) {
        console.log(balance);
      }); //BALANCE

    // mytt.getPastEvents(
    //   "Transfer",
    //   {
    //     fromBlock: 1,
    //     toBlock: "latest"
    //   },
    //   function(error, events) {
    //     console.log(events);
    //   }
    // );
  });
});
app.listen(3000, () => console.log("Example app listening on port 3000!"));
