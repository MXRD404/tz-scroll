import { Component, ElementRef, EventEmitter, Output, signal } from '@angular/core';
import { InViewportDirective } from './viewport.directive';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InViewportDirective, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isFirstBorder = signal(false)
  isSecondBorder = signal(false)
  counter = signal<number>(0)

  constructor() { }

  onVisibleSecondScroll(isVisible: boolean) {
    if (this.isSecondBorder()) return;
    if (isVisible) {
      this.isSecondBorder.set(true)
    }
  }

  onVisibleFirstScroll(isVisible: boolean) {
    this.isFirstBorder.set(isVisible)
    if (isVisible) {
      this.counter.update((v) => v + 1)
    }
  }
}
