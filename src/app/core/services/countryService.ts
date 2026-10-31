import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../../shared/interfaces/RESTcountries.interface';
import { MyCountry } from '../../shared/interfaces/country.interface';
import { CountryMapper } from '../mappers/mapper.country';

const APIurl = 'https://api.restcountries.com/countries/v5'
const APIkey = 'rc_live_ac69a894be574af09b126f1172e6a53d'

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCountry(query:string):Observable<MyCountry[]>
  {
    query= query.toLowerCase();

    return this.http.get<RESTCountry>(`${APIurl}/names.common?q=${query}&api-key=${APIkey}`)
    .pipe(
        map((restCountries) =>
        CountryMapper.mapRestCountryToCountryArray(restCountries.data.objects)
      ),
      catchError(error =>{
        console.log('ErrorFetching', error)

        return throwError(
          () => new Error('No se pudo obtener paises con esa query')
        )
      })
    )
  }



}
