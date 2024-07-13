import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character: { name: string; species: string[]; movies: string[]; spaceships: string[]; } | null = null;

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = parseInt(id, 10); // Convert id to a number
      this.swapiService.getCharacter(numericId).subscribe(data => {
        this.character = {
          name: data.name,
          species: data.species,
          movies: data.films,
          spaceships: data.starships
        };
      });
    }
  }
}
