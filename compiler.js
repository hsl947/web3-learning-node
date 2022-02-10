/*
 * @Author: hsl
 * @Date: 2022-02-10 22:20:21
 * @Description: 获取字节码和abi
 * @LastEditTime: 2022-02-10 22:49:52
 * @FilePath: \web3-learning\compiler.js
 */
const fs = require('fs')
const solc = require('solc');
const contractSol = 'MyContract.sol'
const colors = require('colors');

const data = fs.readFileSync('./MyContract.sol', 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    [contractSol]: {
      content: data
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

let byteCode = ''
let abi = ''

// `output` here contains the JSON output as specified in the documentation
for (let contractName in output.contracts[contractSol]) {
  byteCode = output.contracts[contractSol][contractName].evm.bytecode.object
  abi = output.contracts[contractSol][contractName].abi
}

module.exports = {
  byteCode,
  abi
}
