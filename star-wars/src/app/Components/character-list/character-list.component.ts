import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';

interface Character {
  position: number;
  name: string;
  species: string[];
  birthYear: string;
  movie: string[];
  starship: string[];
  vehicle: string[];
  id: string;
}

export interface Filters {
  movie?: string;
  species?: string;
  starship?: string;
  vehicle?: string;
  birthYearFrom?: string;
  birthYearTo?: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnChanges {
  @Input() filters: Filters = {};

  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  displayedColumns: string[] = ['position', 'name', 'species', 'birthYear'];
  loading: boolean = true;

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.swapiService.getPeople().subscribe(data => {
      this.characters = data.results.map((character: any, index: number) => ({
        position: index + 1,
        name: character.name,
        species: character.species || [],
        birthYear: character.birth_year,
        movie: character.films || [],
        starship: character.starships || [],
        vehicle: character.vehicles || [],
        id: character.url.split('/')[5]
      }));
      this.applyFilters();
      this.loading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.applyFilters();
    }
  }

  applyFilters() {
    this.filteredCharacters = this.characters.filter(character => {
      const matchMovie = this.filters.movie ? character.movie.includes(this.filters.movie) : true;
      const matchSpecies = this.filters.species ? character.species.includes(this.filters.species) : true;
      const matchStarship = this.filters.starship ? character.starship.includes(this.filters.starship) : true;
      const matchVehicle = this.filters.vehicle ? character.vehicle.includes(this.filters.vehicle) : true;
      const matchBirthYearFrom = this.filters.birthYearFrom ? this.compareBirthYear(character.birthYear, this.filters.birthYearFrom, true) : true;
      const matchBirthYearTo = this.filters.birthYearTo ? this.compareBirthYear(character.birthYear, this.filters.birthYearTo, false) : true;
  
      const matchesFilter = matchMovie && matchSpecies && matchStarship && matchVehicle && matchBirthYearFrom && matchBirthYearTo;
  
      if (matchesFilter) {
        console.log(`Character ${character.name} passed the filter.`);
      } else {
        console.log(`Character ${character.name} did not pass the filter.`);
      }
  
      return matchesFilter;
    });
  
    console.log('Filtered Characters:', this.filteredCharacters);
  }
  

  compareBirthYear(birthYear: string, filterYear: string, isFrom: boolean): boolean {
    const year = parseInt(birthYear);
    const filter = parseInt(filterYear);
    const isBBY = birthYear.includes('BBY');
    const isFilterBBY = filterYear.includes('BBY');

    if (isBBY && isFilterBBY) {
      return isFrom ? year <= filter : year >= filter;
    } else if (!isBBY && !isFilterBBY) {
      return isFrom ? year >= filter : year <= filter;
    } else if (isBBY && !isFilterBBY) {
      return isFrom ? true : false; 
    } else {
      return isFrom ? false : true; 
    }
  }
}
