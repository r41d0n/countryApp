import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from "../../component/CountryList/CountryList";

@Component({
  selector: 'app-by-region',
  imports: [CountryList],
  templateUrl: './by-region.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegion { }
