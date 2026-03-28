import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from '../../component/CountryList/CountryList';
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/region.type';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParams: string ): Region {
  queryParams = queryParams.toLocaleLowerCase();
  const validRegions: Record<string, Region> = {
    'Africa': 'Africa',
    'Americas': 'Americas',
    'Asia': 'Asia',
    'Europe': 'Europe',
    'Oceania': 'Oceania',
    'Antarctic': 'Antarctic',
  };

  return validRegions[queryParams] ?? 'Americas';
}


@Component({
  selector: 'app-by-region',
  imports: [CountryList],
  templateUrl: './by-region.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegion {
  countryService = inject(CountryService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  queryParam = this.activeRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam));


  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate([], { queryParams: { region: params.query } });
      return this.countryService.searchByRegion(params.query);
    },
  });
}
