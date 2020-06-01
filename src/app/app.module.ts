import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightComponent } from './components/flight.component';
import { FlightModule } from './components/flight.module';
import { FlightReducer, InitialState, initialState } from './components/flight.reducer';


@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<InitialState>) {
    ngRedux.configureStore(FlightReducer, initialState);
  }
}
