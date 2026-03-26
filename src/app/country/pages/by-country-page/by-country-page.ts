import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountrySearchInput } from '../../component/countrySearchInput/countrySearchInput';
import { CountryList } from '../../component/CountryList/CountryList';
import { CountryService } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    },
  });
}
