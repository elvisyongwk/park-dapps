import { Component, OnInit } from '@angular/core';
import { SmartContractsService } from './smart-contracts/smart-contracts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  contract: any;
  accounts: any;

  constructor(
    private smartContractService: SmartContractsService
  ) {}

  ngOnInit() {
    this.contract = this.smartContractService.getSimpleSmartContract();
    this.accounts = this.smartContractService.getAccounts();

    console.log(this.contract);
    console.log(this.accounts);
  }
}
