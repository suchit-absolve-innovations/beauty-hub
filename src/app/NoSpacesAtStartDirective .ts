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

    // Update the input value
    input.value = inputValue;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    // Prevent the default behavior for the space key only if the input starts with a space
    const input = this.el.nativeElement as HTMLInputElement;
    if (event.key === ' ' && input.value.trim() === '') {
      event.preventDefault();
    }
  }
}
