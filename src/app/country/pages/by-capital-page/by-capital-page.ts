import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from "../../component/CountryList/CountryList";
import { CountrySearchInput } from "../../component/countrySearchInput/countrySearchInput";

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, CountrySearchInput],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {
  onSearch(value: string) {
    console.log(value);
  }
}
