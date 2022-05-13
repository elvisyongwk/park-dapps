import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SmartContractsService } from './smart-contracts/smart-contracts.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SmartContractsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
