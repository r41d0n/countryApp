import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchInput } from '../../component/countrySearchInput/countrySearchInput';
import { CountryList } from '../../component/CountryList/CountryList';
import { CountryService } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  countryService = inject(CountryService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  
  queryParams = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParams);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate([], { queryParams: { query: params.query } });
      return this.countryService.searchByCountry(params.query);
    },
  });
}
