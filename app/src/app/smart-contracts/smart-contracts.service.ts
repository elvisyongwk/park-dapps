import { Injectable } from '@angular/core';
import Web3 from 'web3';
import parkings from '../../../truffle/build/contracts/Parkings.json';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';


@Injectable({
  providedIn: 'root'
})
export class SmartContractsService {
  web3 = new Web3('http://localhost:7545') // local ethereum node

  parkingsContract = new this.web3.eth.Contract(parkings.abi as AbiItem[], parkings.networks[5777].address);

  constructor() {}

  getParkings(): Contract {
    return this.parkingsContract;
  }

  getAccounts(): Promise<string[]> {
    return this.web3.eth.getAccounts();
  }

  checkBalance(address: string): Promise<string> {
    return this.web3.eth.getBalance(address);
  } 
}
