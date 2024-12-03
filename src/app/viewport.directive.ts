import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})

export class InViewportDirective {
  @Output() visible = new EventEmitter<boolean>();
  private observer: IntersectionObserver;

  constructor(private element: ElementRef) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visible.emit(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
  }

  ngOnInit() {
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
