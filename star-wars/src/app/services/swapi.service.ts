import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}`);
  }

  getFilms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species/`);
  }

  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles/`);
  }
}
