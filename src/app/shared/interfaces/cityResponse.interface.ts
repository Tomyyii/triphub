export interface CityResponse{
  results: City[]
}

export interface City{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  population?: number;
}
