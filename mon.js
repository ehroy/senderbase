import {
    Wallet,
    ethers,
    JsonRpcProvider,
    Contract,
    formatEther,
    parseUnits,
    parseEther,
  } from "ethers";
  import fs from "fs";
  import inquirer from "inquirer";
  import "dotenv/config";
  import delay from "delay";
  const RPC_URL = process.env.CHAIN_JARINGAN;
  const provider = new JsonRpcProvider(RPC_URL);
  function tranferfunds(privateKey) {
    const contractAccess = new Contract(
      process.env.CONTRACT_ADDRESS,
      [
        {
            inputs: [{
                internalType: "string",
                name: "name",
                type: "string"
            }, {
                internalType: "string",
                name: "symbol",
                type: "string"
            }, {
                internalType: "uint256",
                name: "totalSupply_",
                type: "uint256"
            }, {
                internalType: "address",
                name: "treasury",
                type: "address"
            }],
            stateMutability: "nonpayable",
            type: "constructor"
        }, {
            inputs: [],
            name: "InvalidShortString",
            type: "error"
        }, {
            inputs: [{
                internalType: "string",
                name: "str",
                type: "string"
            }],
            name: "StringTooLong",
            type: "error"
        }, {
            inputs: [],
            name: "Unauthorized",
            type: "error"
        }, {
            anonymous: !1,
            inputs: [{
                indexed: !0,
                internalType: "address",
                name: "owner",
                type: "address"
            }, {
                indexed: !0,
                internalType: "address",
                name: "spender",
                type: "address"
            }, {
                indexed: !1,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }],
            name: "Approval",
            type: "event"
        }, {
            anonymous: !1,
            inputs: [],
            name: "EIP712DomainChanged",
            type: "event"
        }, {
            anonymous: !1,
            inputs: [{
                indexed: !0,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            }, {
                indexed: !0,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }],
            name: "OwnershipTransferred",
            type: "event"
        }, {
            anonymous: !1,
            inputs: [{
                indexed: !1,
                internalType: "address",
                name: "tokenPool",
                type: "address"
            }],
            name: "TokenPoolUpdated",
            type: "event"
        }, {
            anonymous: !1,
            inputs: [{
                indexed: !0,
                internalType: "address",
                name: "from",
                type: "address"
            }, {
                indexed: !0,
                internalType: "address",
                name: "to",
                type: "address"
            }, {
                indexed: !1,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }],
            name: "Transfer",
            type: "event"
        }, {
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            outputs: [{
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "owner",
                type: "address"
            }, {
                internalType: "address",
                name: "spender",
                type: "address"
            }],
            name: "allowance",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "spender",
                type: "address"
            }, {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }],
            name: "approve",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "account",
                type: "address"
            }],
            name: "balanceOf",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [],
            name: "decimals",
            outputs: [{
                internalType: "uint8",
                name: "",
                type: "uint8"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "spender",
                type: "address"
            }, {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256"
            }],
            name: "decreaseAllowance",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [],
            name: "eip712Domain",
            outputs: [{
                internalType: "bytes1",
                name: "fields",
                type: "bytes1"
            }, {
                internalType: "string",
                name: "name",
                type: "string"
            }, {
                internalType: "string",
                name: "version",
                type: "string"
            }, {
                internalType: "uint256",
                name: "chainId",
                type: "uint256"
            }, {
                internalType: "address",
                name: "verifyingContract",
                type: "address"
            }, {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32"
            }, {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "spender",
                type: "address"
            }, {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256"
            }],
            name: "increaseAllowance",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [],
            name: "name",
            outputs: [{
                internalType: "string",
                name: "",
                type: "string"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "owner",
                type: "address"
            }],
            name: "nonces",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [],
            name: "owner",
            outputs: [{
                internalType: "address",
                name: "",
                type: "address"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "owner",
                type: "address"
            }, {
                internalType: "address",
                name: "spender",
                type: "address"
            }, {
                internalType: "uint256",
                name: "value",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
            }, {
                internalType: "uint8",
                name: "v",
                type: "uint8"
            }, {
                internalType: "bytes32",
                name: "r",
                type: "bytes32"
            }, {
                internalType: "bytes32",
                name: "s",
                type: "bytes32"
            }],
            name: "permit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "_tokenPool",
                type: "address"
            }],
            name: "setTokenPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [],
            name: "symbol",
            outputs: [{
                internalType: "string",
                name: "",
                type: "string"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [],
            name: "tokenPool",
            outputs: [{
                internalType: "address",
                name: "",
                type: "address"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [],
            name: "totalSupply",
            outputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256"
            }],
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "to",
                type: "address"
            }, {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }],
            name: "transfer",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "from",
                type: "address"
            }, {
                internalType: "address",
                name: "to",
                type: "address"
            }, {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }],
            name: "transferFrom",
            outputs: [{
                internalType: "bool",
                name: "",
                type: "bool"
            }],
            stateMutability: "nonpayable",
            type: "function"
        }, {
            inputs: [{
                internalType: "address",
                name: "newOwner",
                type: "address"
            }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        }
      ],
      new Wallet(privateKey, provider)
    );
    return contractAccess;
  }
  (async () => {
    var choicess = [
      "bulk send all token ke satu wallet",
      "bulk send nominal token ke banyak wallet",
      "CANCEL",
    ];
    let selectvoucher = await inquirer
      .prompt([
        {
          type: "rawlist",
          choices: choicess,
          name: "selected",
          message: "Select Your Choices ?",
        },
      ])
      .then((answers) => {
        return answers.selected;
      });
  
    if (selectvoucher == "CANCEL") {
      console.log("[CANCELED]");
    }
    const select = [choicess.indexOf(selectvoucher)][0];
    switch (select) {
      case 0:
        let question1 = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "list privatekey txt ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        const listwallet = question1;
        let question2 = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "wallet penampung token ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        const delayseting = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "set delay ( 1000 = 1 sec ) ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        const wallettujuan = question2;
        const dataakuns = fs.readFileSync(listwallet, "utf8").split("\n");
        for (let i in dataakuns) {
          try {
            const privateKey = dataakuns[i].replace("\r", "");
            const secondWallet = new Wallet(privateKey, provider);
            const feeData = await provider.getFeeData();
            // console.log(feeData)
            const gasPriceInGwei = ethers.formatUnits(feeData.gasPrice, "gwei");
            console.log(`[${i}] => Processing wallet : ${secondWallet.address}`);
  
            console.log(
              `Transfering for fee ${parseFloat(
                formatEther(await provider.getBalance(secondWallet.address))
              )} to this account!`
            );
            const contractAccess = await tranferfunds(privateKey);
            const saldotoken = await contractAccess.balanceOf(
              secondWallet.address
            );
            console.log(
              `saldo with contract ${await contractAccess.name()} ${formatEther(
                saldotoken
              )}`
            );
            const amount = parseFloat(formatEther(saldotoken));
            console.log(
              `try to send saldo with contract ${await contractAccess.name()} ${formatEther(
                saldotoken
              )}`
            );
            console.log(`gas fee estimasi ${gasPriceInGwei}`);
            const sendtoken = await contractAccess.transfer(
              wallettujuan,
              parseEther(amount.toString()),
              {
                gasPrice: parseUnits(gasPriceInGwei, "gwei"),
                gasLimit: 100000,
              }
            );
            if (sendtoken.hash) {
              console.log(`tx hash https://etherscan.io/tx/${sendtoken.hash}`);
            } else {
              console.log("tx hash not found or not successfully send token...");
            }
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          console.log("\n");
          await delay(parseInt(delayseting));
        }
        break;
      case 1:
        let question3 = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "list wallet penampung token ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        let question4 = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "privatekey sender token ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        let question5 = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "nominal yang mau dikirim ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        const delaysetings = await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "set delay ( 1000 = 1 sec ) ? ",
            },
          ])
          .then((answers) => {
            return answers.name;
          });
        const dataakun = fs.readFileSync(question3, "utf8").split("\n");
        for (let i in dataakun) {
          try {
            const walletpenampung = dataakun[i].replace("\r", "");
            const secondWallet = new Wallet(question4, provider);
            const feeData = await provider.getFeeData();
            const gasPriceInGwei = ethers.formatUnits(feeData.gasPrice, "gwei");
            console.log(`[${i}] => Processing wallet : ${secondWallet.address}`);
  
            console.log(
              `Transfering for fee ${parseFloat(
                formatEther(await provider.getBalance(secondWallet.address))
              )} to this account!`
            );
            const contractAccess = await tranferfunds(question4);
            const saldotoken = await contractAccess.balanceOf(
              secondWallet.address
            );
            console.log(
              `saldo with contract ${await contractAccess.name()} ${formatEther(
                saldotoken
              )}`
            );
            console.log(
              `try to send saldo with contract ${await contractAccess.name()} ${question5}`
            );
            console.log(`gas fee estimasi ${gasPriceInGwei}`);
            const sendtoken = await contractAccess.transfer(
              walletpenampung,
              parseEther(question5.toString()),
              {
                gasPrice: parseUnits(gasPriceInGwei, "gwei"),
              }
            );
            if (sendtoken.hash) {
              console.log(`tx hash https://basescan.org/tx/${sendtoken.hash}`);
            } else {
              console.log("tx hash not found or not successfully send token...");
            }
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          console.log("\n");
          await delay(parseInt(delaysetings));
        }
        break;
      default:
        break;
    }
  })();
