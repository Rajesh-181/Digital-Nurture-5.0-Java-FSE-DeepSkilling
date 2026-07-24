import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective implements OnInit {
  // Configurable color input, defaulting to yellow.
  // We name it the same as the selector so we can write appHighlight="lightblue"
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Initial style setup if needed
  }

  // Listener for mouse hover enter
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  // Listener for mouse hover leave
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
