import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people`);
  }

  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}`);
  }

  getFilms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/films`);
  }
  getPeople(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/species`);
  }

  getStarships(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starships`);
  }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }

  // Fetch details for multiple films based on IDs
  getFilmsDetails(ids: string[]): Observable<string[]> {
    const filmRequests = ids.map(id => this.http.get(`${this.baseUrl}/films/${id}`).pipe(map((film: any) => film.title)));
    return forkJoin(filmRequests) as Observable<string[]>;
  }

  // Fetch details for multiple vehicles based on IDs
  getVehiclesDetails(ids: string[]): Observable<string[]> {
    const vehicleRequests = ids.map(id => this.http.get(`${this.baseUrl}/vehicles/${id}`).pipe(map((vehicle: any) => vehicle.name)));
    return forkJoin(vehicleRequests) as Observable<string[]>;
  }

  // Fetch details for multiple starships based on IDs
  getStarshipsDetails(ids: string[]): Observable<string[]> {
    const starshipRequests = ids.map(id => this.http.get(`${this.baseUrl}/starships/${id}`).pipe(map((starship: any) => starship.name)));
    return forkJoin(starshipRequests) as Observable<string[]>;
  }
 
}
