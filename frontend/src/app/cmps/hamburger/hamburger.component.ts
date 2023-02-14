import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent {
  @Input() isOpened = false;
  @Output() toggleMenu = new EventEmitter<void>();

  onButtonClick(): void {
    this.toggleMenu.emit();
  }
}