import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyideComponent } from './myide/myide.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';
import { servicesArray } from './../services/';

@NgModule({
  declarations: [
    AppComponent,
    MyideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AceEditorModule
  ],
  providers: [
    servicesArray
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
