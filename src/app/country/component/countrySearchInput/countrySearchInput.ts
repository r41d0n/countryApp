import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './countrySearchInput.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInput {
  value = output<string>();
  placeHolder = input<string>('Search');
}
