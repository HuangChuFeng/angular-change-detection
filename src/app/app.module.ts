import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParentComponent } from './components/parent/parent.component';
import { Child1Component } from './components/child-1.component';
import { Child2Component } from './components/child-2.component';
import { Child11Component } from './components/child-1-1.component';
import { Child21Component } from './components/child-2-1.component';
import { ChildComponent } from './components/child.component';
import { ViewChildComponent } from './components/view-child.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ViewChildComponent,
    ChildComponent,
    Child1Component,
    Child2Component,
    Child11Component,
    Child21Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
