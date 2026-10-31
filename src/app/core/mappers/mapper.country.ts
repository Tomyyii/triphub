
import { MyCountry } from "../../shared/interfaces/country.interface";
import type { Country } from "../../shared/interfaces/RESTcountries.interface";
import { RESTCountry } from "../../shared/interfaces/RESTcountries.interface";

export class CountryMapper {
  //static RestCountry => Country

  //static RestCountry[] => Country[]


  static mapRestCountryToCountry(item: Country):MyCountry{
    return{
      alpha_2:item.codes.alpha_2,
      capital:item.capitals[0]?.name ?? 'No tiene capital',
      flag:item.flag.emoji,
      name:item.names.translations['spa']?.common ?? 'No spanish name',
      population:item.population,
      url_svg:item.flag.url_svg
    }
  }


  static mapRestCountryToCountryArray(items: Country[]):MyCountry[]
  {
    return items.map(this.mapRestCountryToCountry)

  }

}
