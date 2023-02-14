import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[contenteditable]'
})
export class ContenteditableDirective {
  @Input() set contenteditable(value: boolean) {
    this.el.nativeElement.contentEditable = value;
  }
  constructor(private el: ElementRef) { }
}
