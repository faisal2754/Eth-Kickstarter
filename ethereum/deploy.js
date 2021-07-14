const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
require('dotenv').config()

const provider = new HDWalletProvider(
   process.env.MNEMONIC,
   'https://rinkeby.infura.io/v3/49253ae5b4b3447ebda91f7a3553860d'
)

const web3 = new Web3(provider)

async function deploy() {
   const accounts = await web3.eth.getAccounts()
   console.log(`Deploying from ${accounts[0]}`)
   const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({
         from: accounts[0],
         gas: '1000000'
      })

   console.log(`Contract deployed to ${result.options.address}`)
}

deploy()
