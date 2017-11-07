// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatToolbarModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { LibSharedModule, EventService } from 'fint-shared-components';

// Services
import { CommonComponentService } from './views/components/common-component.service';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LibSharedModule,

    MatToolbarModule,
    AngularFontAwesomeModule,

    AppRoutingModule
  ],
  providers: [ CommonComponentService/* , EventService */],
  bootstrap: [AppComponent]
})
export class AppModule { }
