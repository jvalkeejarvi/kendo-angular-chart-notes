import { ElementRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { PopupModule, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    PopupModule,
  ],
  providers: [
    PopupModule,
    { provide: POPUP_CONTAINER, useFactory: (): ElementRef => ({ nativeElement: document.body }) },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
