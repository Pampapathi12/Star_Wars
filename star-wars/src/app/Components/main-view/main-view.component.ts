import { Component } from '@angular/core';
import { Filters } from '../character-list/character-list.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  filters: Filters = {};

  onFilterChanged(newFilters: Filters) { 
    this.filters = newFilters;
  }
}
