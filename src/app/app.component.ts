import { Component, signal } from '@angular/core';
import { InViewportDirective } from './viewport.directive';
import { NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

enum BorderEnum {
  firstBorder = 1,
  secondBorder = 2
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InViewportDirective, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentBorder = new BehaviorSubject<BorderEnum | undefined>(undefined);
  counter = signal<number>(0);
  secondBorderVisible = false;  // Флаг, чтобы рамка второго бордера оставалась активной

  constructor() {}

  onVisibleScroll(border: BorderEnum, isVisible: boolean) {
    if (border === BorderEnum.secondBorder && isVisible && !this.secondBorderVisible) {
      this.secondBorderVisible = true; 
      this.currentBorder.next(BorderEnum.secondBorder); 
    }

    if (border === BorderEnum.firstBorder && isVisible && this.currentBorder.value !== BorderEnum.firstBorder) {
      this.currentBorder.next(BorderEnum.firstBorder);  
      this.counter.update(v => v + 1); 
    }

    if (!isVisible && border === BorderEnum.firstBorder) {
      this.currentBorder.next(undefined);
    }
  }
}
