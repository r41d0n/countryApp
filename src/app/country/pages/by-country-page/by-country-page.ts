import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountrySearchInput } from "../../component/countrySearchInput/countrySearchInput";
import { CountryList } from "../../component/CountryList/CountryList";

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage { }
