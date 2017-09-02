import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
