// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { LibSharedModule } from 'fint-shared-components';

// Services
import { CommonComponentService } from './api/common-component.service';
import { PersonService } from './api/person.service';
import { EventService } from 'fint-shared-components';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),

    AppRoutingModule,
    LibSharedModule,
  ],
  providers: [PersonService, CommonComponentService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
