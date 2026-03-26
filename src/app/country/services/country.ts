import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { CountryMapper } from '../mapper/country.mapper';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(() => {
        return throwError(() => new Error(`Error searching countries by capital: ${query}`));
      }),
    );
  }

  searchByCountry (query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(3000),
      catchError(() => {
        return throwError(() => new Error(`Error searching countries by name: ${query}`));
      }),
    );
  }

  searchByCountryByAlphaCode (query: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${query}`;
    
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError(() => {
        return throwError(() => new Error(`Error searching countries by alpha code: ${query}`));
      }),
    );
  }
}
