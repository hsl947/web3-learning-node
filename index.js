/*
 * @Author: hsl
 * @Date: 2022-01-20 10:25:49
 * @LastEditTime: 2022-02-09 09:29:16
 * @Description: https://www.qikegu.com/docs/5127
 * @FilePath: \web3-learning\index.js
 */
const Web3 = require('web3')
const colors = require('colors');
const Tx = require('ethereumjs-tx')

// const web3Ws = "wss://ropsten.infura.io/ws/v3/009277f1a7cf47b3bfaa3120295f4f4f"
// const web3Ws = "https://data-seed-prebsc-1-s1.binance.org:8545"
const web3Ws = "wss://bsc.getblock.io/testnet/?api_key=54c5c8c5-57eb-4e7c-bc53-1c9f03171769"
const web3 = new Web3(web3Ws);

const { utils } = web3

// ABI代表“Abstract Binary Interface/抽象二进制接口”，它是一个JSON数组，是面向以太坊虚拟机的可执行文件
// 类似于windows 平台上的二进制可执行文件。智能合约编译后生成ABI文件，可以在以太坊虚拟机上执行。
const abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

// 钱包地址
const account1 = '0xaD3Eb70377f6aC870BE8a71b1ca304638a8DC562'
const account2 = '0xD70e640F76e16dD83F305Ca9C64145Af6ED7f7D4'

// 私钥，需要去掉前面的0x
const privateKey1 = '3757aec5297e7667d6bbf52beae022f2d3cce677c782c8b49d2a4e7baccaa141'
const privateKey1Buffer = Buffer.from(privateKey1, 'hex')

const { toHex, toWei } = utils

// 代币地址
const address = '0xbEBBEeBE54c79E9E1113967F14664d68df3Ffced'
// 代币合约对象
const contract = new web3.eth.Contract(abi, address)

// 创建新钱包账户
const createAccount = () => {
  const newAccount = web3.eth.accounts.create()
  console.log('newAccount: ', newAccount);
}
// createAccount()

// 获取合约信息
const getContractInfo = () => {
  // 获取Token的名称、符号和总供应量等等（可以用同步或异步的写法）
  contract.methods.name().call().then(name => {
    console.log('name: ', colors.red(name));
  })
  contract.methods.symbol().call().then(symbol => {
    console.log('symbol: ', symbol.red);
  })
  contract.methods.totalSupply().call().then(totalSupply => {
    const rest = utils.fromWei(totalSupply, 'ether')
    console.log('totalSupply: ', rest.red);
  })
  contract.methods.balanceOf(account1).call().then(balanceOf => {
    const rest = utils.fromWei(balanceOf, 'ether')
    console.log('balanceOf: ', rest.red);
  })
}
// getContractInfo()

// 获取余额
const getBalance = () => {
  // 读取address中的余额，余额单位是wei
  web3.eth.getBalance(account1, (err, wei) => {
    if(err) {
      console.log(err)
      return
    }
    // 余额单位从wei转换为ether
    const balance = utils.fromWei(wei, 'ether')
    console.log("account1 balance: " + `${balance} BNB`.bgGreen)
  })
}
getBalance()

// 发送交易
const sendTrade = () => {
  // 构建交易对象
  web3.eth.getTransactionCount(account1).then(count => {
    const tx = new Tx({
      nonce: toHex(count),
      to: account2,
      value: toHex(toWei('0.0001', 'ether')),
      gasLimit: toHex(21000),
      gasPrice: toHex((toWei('5', 'gwei')))
    })

    // 签署交易
    tx.sign(privateKey1Buffer)
    const raw = `0x${tx.serialize().toString('hex')}`

    // 广播交易
    web3.eth.sendSignedTransaction(raw).then(txHash => {
      console.log('交易成功~'.green);
      console.log('txHash: ', txHash.transactionHash.yellow);
      process.exit()
    })
  })
}
sendTrade()
