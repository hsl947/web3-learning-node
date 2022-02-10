/*
 * @Author: hsl
 * @Date: 2022-01-28 16:21:08
 * @LastEditTime: 2022-02-10 22:52:01
 * @FilePath: \web3-learning\contract.js
 */
const compiler = require('./compiler')

const abi = compiler.abi

// 字节码
const byteCode = compiler.byteCode

const data = `0x${byteCode}`

const Web3 = require('web3')
const colors = require('colors');
const Tx = require('ethereumjs-tx')

const web3Ws = "wss://bsc.getblock.io/testnet/?api_key=54c5c8c5-57eb-4e7c-bc53-1c9f03171769"
const web3 = new Web3(web3Ws);

const { utils } = web3

// 钱包地址
const account1 = '0xaD3Eb70377f6aC870BE8a71b1ca304638a8DC562'

// 私钥，需要去掉前面的0x
const privateKey1 = '3757aec5297e7667d6bbf52beae022f2d3cce677c782c8b49d2a4e7baccaa141'
const privateKey1Buffer = Buffer.from(privateKey1, 'hex')

const { toHex, toWei } = utils

// 创建合约
const createContract = () => {
  web3.eth.getTransactionCount(account1).then(count => {
    // 构建交易对象
    const tx = new Tx({
      data,
      nonce: toHex(count),
      gasLimit: toHex(1000000),
      gasPrice: toHex((toWei('5', 'gwei')))
    })

		// 签署交易
		tx.sign(privateKey1Buffer)
		const raw = `0x${tx.serialize().toString('hex')}`

    // 广播交易
    web3.eth.sendSignedTransaction(raw).then(txHash => {
      console.log('合约创建成功~'.green);
      console.log('txHash: ', txHash.transactionHash.yellow);
			process.exit()
    })
  })
}
// createContract()

// 添加账户，调用方法的时候才不会报错 unknown account
web3.eth.accounts.wallet.add('0x' + privateKey1)

// 测试合约方法
const testMethods = () => {
  // 自己发布的合约
  const myContractAddress = '0x8bEb87c3d72A5EEe275D4Dab0B1E598efD97018C'
  const myContract = new web3.eth.Contract(abi, myContractAddress);

  console.log('myContract: ', myContract.methods);
  myContract.methods.get().call().then(res => {
		console.log('res: ', res);
		// //This is my first contract
		// myContract.methods.set('123').send({from: account1, gas: toHex(1000000)})
		// .on('receipt', function(receipt){
		// 	console.log('receipt: ', receipt);
		// 	process.exit()
		// }).on('error', function(error, receipt) {
		// 	console.log('error: ', error);
		// 	process.exit()
		// });
  })
}
testMethods()
