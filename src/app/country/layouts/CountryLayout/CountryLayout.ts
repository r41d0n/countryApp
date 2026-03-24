import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "../../component/top-menu/top-menu";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu],
  templateUrl: './CountryLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryLayout { }
