import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './Components/main-view/main-view.component';
import { CharacterListComponent } from './Components/character-list/character-list.component';
import { CharacterFilterComponent } from './Components/character-filter/character-filter.component';
import { CharacterDetailsComponent } from './Components/character-details/character-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    CharacterListComponent,
    CharacterFilterComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
