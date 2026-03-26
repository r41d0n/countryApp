import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryList } from '../../component/CountryList/CountryList';
import { CountrySearchInput } from '../../component/countrySearchInput/countrySearchInput';
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, CountrySearchInput],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCapital(params.query);
    },
  });
}
