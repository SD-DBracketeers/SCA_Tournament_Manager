import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit {
  @Input() items: string[] = []; // items passed in from parent components

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Setup scroll event logic if needed
    this.initializeScrollEvent();
  }

  initializeScrollEvent() {
    const container = this.el.nativeElement.querySelector('.scroll-container');
    this.items.forEach((_, index) => {
      const item = container.children[index];
      item.addEventListener('click', () => {
        this.scrollToItem(index);
      });
    });
  }

  scrollToItem(index: number) {
    const container = this.el.nativeElement.querySelector('.scroll-container');
    const item = container.children[index];
    const top = item.offsetTop;
    container.scrollTop = top - container.offsetTop;
  }
}
