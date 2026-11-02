import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CityResponse } from '../../shared/interfaces/cityResponse.interface';

// BUSQUEDA DE DATOS METEOROLOGICOS
// const API_URL = 'https://api.open-meteo.com/v1/forecast'

// BUSQUEDA DE CIUDADES
const API_URL = 'https://geocoding-api.open-meteo.com/v1/search'

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService {


  private http = inject(HttpClient);

  obtenerCiudades(query:string, countryCode:string):Observable <CityResponse>
  {

    return this.http.get<CityResponse>(API_URL, {
      params:{
        name:query,
        countryCode:countryCode,
        count:10,
        language:'es'
      }
    })

  }

}
