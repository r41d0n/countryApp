import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './countrySearchInput.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInput {
  value = output<string>();
  placeHolder = input<string>('Search');
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 800);

    onCleanup(() => clearTimeout(timeout));
  });
}
