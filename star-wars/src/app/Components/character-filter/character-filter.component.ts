import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.css']
})
export class CharacterFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();

  movies: { title: string; url: string; }[] = [];
  speciesList: { name: string; url: string; }[] = [];
  starships: { name: string; url: string; }[] = [];
  vehicles: { name: string; url: string; }[] = [];

  selectedMovie: string = '';
  selectedSpecies: string = '';
  selectedStarship: string = '';
  selectedVehicle: string = '';
  birthYearFrom: string = '';
  birthYearTo: string = '';

  constructor(private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getFilms().subscribe(data => this.movies = data.results);
    this.swapiService.getSpecies().subscribe(data => this.speciesList = data.results);
    this.swapiService.getStarships().subscribe(data => this.starships = data.results);
    this.swapiService.getVehicles().subscribe(data => this.vehicles = data.results);
  }

  applyFilter() {
    this.filterChanged.emit({
      movie: this.selectedMovie,
      species: this.selectedSpecies,
      starship: this.selectedStarship,
      vehicle: this.selectedVehicle,
      birthYearFrom: this.birthYearFrom,
      birthYearTo: this.birthYearTo
    });
  }
}
