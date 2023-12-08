import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noSpacesAtStart]'
})
export class NoSpacesAtStartDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let inputValue = input.value;

    // Trim spaces at the beginning
    if (/^\s/.test(inputValue)) {
      inputValue = inputValue.trim();
    }

    // Prevent spaces from being entered
    input.value = inputValue.replace(/\s/g, '');
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for the space key
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
}
