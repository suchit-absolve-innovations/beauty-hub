import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirstLetter]'
})
export class CapitalizeFirstLetterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus', ['$event']) onFocus(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    const capitalizedValue: string = this.capitalizeFirstLetter(inputValue);
    this.renderer.setProperty(event.target, 'value', capitalizedValue);
  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    const capitalizedValue: string = this.capitalizeFirstLetter(inputValue);
    this.renderer.setProperty(event.target, 'value', capitalizedValue);
  }

  private capitalizeFirstLetter(value: string): string {
    if (!value) {
      return value;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
