import { Component, OnInit } from '@angular/core';
import { SmartContractsService } from './smart-contracts/smart-contracts.service';
import { Contract } from 'web3-eth-contract';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  accounts: string[] = [];
  contract: Contract;
  availableParkings: { parkingNumber: string, price: number }[] = [];

  parkingNumberControl = new FormControl('');

  constructor(
    private smartContractService: SmartContractsService
  ) {
    this.contract = this.smartContractService.getParkings();
  }

  ngOnInit() {
    this.smartContractService.getAccounts().then((accounts: string[]) => {
      this.accounts = accounts;
    });
    this.setAvailableParkings();
  }

  setAvailableParkings() {
    this.availableParkings = [];
    this.contract.methods.getAvailableParkings().call().then((result: any) => {
      const { 0: parkingNumbers, 1: prices } = result;
      for (let i = 0; i < parkingNumbers.length; i++) {
        this.availableParkings.push({ parkingNumber: parkingNumbers[i], price: prices[i] });
      }
    });
  }

  createParking() {
    this.contract.methods.createParking(this.parkingNumberControl.value)
      .send({ from: this.accounts[2], value: 1, gas: 3000000 })
      .then(() => {
        this.setAvailableParkings();
      });

  }
}
