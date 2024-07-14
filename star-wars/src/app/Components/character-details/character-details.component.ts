import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    films: string[]; // Assuming films is an array of URLs
    vehicles: string[]; // Assuming vehicles is an array of URLs
    starships: string[]; // Assuming starships is an array of URLs
  } = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    films: [],
    vehicles: [],
    starships: []
  };

  filmsDetails: string[] = [];
  vehiclesDetails: string[] = [];
  starshipsDetails: string[] = [];

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = parseInt(id, 10); // Convert id to a number
      this.swapiService.getCharacterDetails(numericId).subscribe(data => {
        this.character = {
          name: data.name,
          height: data.height,
          mass: data.mass,
          hair_color: data.hair_color,
          skin_color: data.skin_color,
          eye_color: data.eye_color,
          birth_year: data.birth_year,
          gender: data.gender,
          films: data.films.map((filmUrl: string) => this.extractIdFromUrl(filmUrl)), // Extract IDs from film URLs
          vehicles: data.vehicles.map((vehicleUrl: string) => this.extractIdFromUrl(vehicleUrl)), // Extract IDs from vehicle URLs
          starships: data.starships.map((starshipUrl: string) => this.extractIdFromUrl(starshipUrl)) // Extract IDs from starship URLs
        };

        // Fetch details for films, vehicles, and starships
        this.fetchDetails();
      });
    }
  }

  fetchDetails() {
    const requests = [];

    // Create requests for fetching film, vehicle, and starship details concurrently
    if (this.character.films.length > 0) {
      requests.push(this.swapiService.getFilmsDetails(this.character.films));
    }
    if (this.character.vehicles.length > 0) {
      requests.push(this.swapiService.getVehiclesDetails(this.character.vehicles));
    }
    if (this.character.starships.length > 0) {
      requests.push(this.swapiService.getStarshipsDetails(this.character.starships));
    }

    // Execute all requests concurrently using forkJoin
    forkJoin(requests).subscribe((responses: any[]) => {
      if (responses.length > 0) {
        this.filmsDetails = responses[0]; // Assuming films details are returned first
      }
      if (responses.length > 1) {
        this.vehiclesDetails = responses[1]; // Assuming vehicles details are returned second
      }
      if (responses.length > 2) {
        this.starshipsDetails = responses[2]; // Assuming starships details are returned third
      }
    });
  }

  extractIdFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2]; // Assuming the ID is the second last segment in the URL
  }
}
