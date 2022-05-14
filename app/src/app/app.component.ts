import { Component, OnInit } from '@angular/core';
import { SmartContractsService } from './smart-contracts/smart-contracts.service';
import { Contract } from 'web3-eth-contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  accounts: any;
  helloWorld: any;

  constructor(
    private smartContractService: SmartContractsService
  ) {}

  ngOnInit() {
    this.accounts = this.smartContractService.getAccounts();
    const contract = this.smartContractService.getHelloWorld() as Contract;
    contract.methods.hello().call().then((result: any) => {
      this.helloWorld = result;
    });
  }
}
