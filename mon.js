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
        type: "function",
        name: "balanceOf",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
          {
            type: "address",
            name: "owner",
          },
        ],
        outputs: [
          {
            type: "uint256",
            name: "balance",
          },
        ],
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
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
