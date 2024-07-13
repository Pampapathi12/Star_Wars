import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './Components/main-view/main-view.component';
import { CharacterDetailsComponent } from './Components/character-details/character-details.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
