import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class SmartContractsService {
  contractABI = [];
  contractAddress = '0x3EE9110b278B35d381D71ce8201a87BB6FFee760';

  web3 = new Web3('http://localhost:9545') // ethereum node

  simpleSmartContract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);

  constructor() {}

  getSimpleSmartContract(): any {
    return this.simpleSmartContract;
  }

  getAccounts(): any {
    return this.web3.eth.getAccounts();
  }
}
