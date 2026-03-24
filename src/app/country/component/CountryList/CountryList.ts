import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './CountryList.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList { }
