import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { CountryMapper } from '../mapper/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    
    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    console.log('Making HTTP request for query:', query);
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheByCapital.set(query, countries)),
      catchError(() => {
        return throwError(() => new Error(`Error searching countries by capital: ${query}`));
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    
    if (this.queryCacheByCountry.has(query)) {
      return of(this.queryCacheByCountry.get(query) ?? []);
    }

    console.log('Making HTTP request for Country query:', query);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheByCountry.set(query, countries)),
      delay(2000),
      catchError(() => {
        return throwError(() => new Error(`No countries by name: ${query}`));
      }),
    );
  }

  searchByCountryByAlphaCode(query: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${query}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError(() => {
        return throwError(() => new Error(`Error searching countries by alpha code: ${query}`));
      }),
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheByRegion.has(region)) {
      return of(this.queryCacheByRegion.get(region) ?? []);
    }

    console.log('Making HTTP request for Region query:', region);

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheByRegion.set(region, countries)),
      catchError((error) => {
        console.log("🚀 ~ CountryService ~ searchByRegion ~ error:", error)
        return throwError(() => new Error(`Error searching countries by region: ${region}`));
      }),
    );
  }

}
