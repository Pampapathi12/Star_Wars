import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: { name: string; movies: string[]; species: string; birthYear: string; }[] = [];
  filteredCharacters: { name: string; movies: string[]; species: string; birthYear: string; }[] = [];
  filters: { movie?: string; species?: string; birthYearFrom?: number; birthYearTo?: number; } = {};
  displayedColumns: string[] = ['position', 'name', 'species', 'birthYear'];
  totalCharacters = 0;

  constructor(private swapiService: SwapiService) { }

  ngOnInit() {
    this.swapiService.getCharacters().subscribe(data => {
      this.characters = data.results.map((character: any, index: number) => ({
        position: index + 1,
        name: character.name,
        movies: character.films || [], // Assuming the API provides a list of films
        species: character.species,
        birthYear: character.birth_year
      }));
      this.filteredCharacters = this.characters;
      this.totalCharacters = this.characters.length;
    });
  }

  applyFilter(filters: any) {
    this.filteredCharacters = this.characters.filter((character) => {
      return (!filters.movie || character.movies.includes(filters.movie)) &&
             (!filters.species || character.species === filters.species) &&
             (!filters.birthYearFrom || this.getYear(character.birthYear) >= filters.birthYearFrom) &&
             (!filters.birthYearTo || this.getYear(character.birthYear) <= filters.birthYearTo);
    });
  }

  getYear(birthYear: string): number {
    // Convert Star Wars birth year to a number. Handle cases like '19BBY' (Before Battle of Yavin).
    // For simplicity, let's convert all BBY years to negative numbers.
    if (birthYear.endsWith('BBY')) {
      return -parseInt(birthYear.replace('BBY', '').trim());
    } else if (birthYear.endsWith('ABY')) {
      return parseInt(birthYear.replace('ABY', '').trim());
    } else {
      return 0; // Unknown format
    }
  }

  selectCharacter(character: any) {
    // Navigate to character detail view
  }
}
