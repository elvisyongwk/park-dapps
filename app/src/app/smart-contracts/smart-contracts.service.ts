import { Injectable } from '@angular/core';
import Web3 from 'web3';
import helloWorld from '../../../truffle/build/contracts/HelloWorld.json';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';


@Injectable({
  providedIn: 'root'
})
export class SmartContractsService {
  web3 = new Web3('http://localhost:9545') // ethereum node

  helloWorldContract = new this.web3.eth.Contract(helloWorld.abi as AbiItem[], helloWorld.networks[5777].address);

  constructor() {}

  getHelloWorld(): Contract {
    return this.helloWorldContract;
  }

  getAccounts(): any {
    return this.web3.eth.getAccounts();
  }
}
