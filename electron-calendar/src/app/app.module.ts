import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
//import { CalendarComponent } from './calendar/calendar.component';
//import { ChartComponent } from './chart/chart.component';
//import { BChartComponent } from './bchart/bchart.component';
//import { ToolTipComponent } from './tooltip/tooltip.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { TopMenuComponent } from './topmenu/topmenu.component';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    //CalendarComponent,
    //ChartComponent,
    //BChartComponent,
    //ToolTipComponent,
    SideMenuComponent,
    TopMenuComponent
  ],
  providers: [
    DataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
