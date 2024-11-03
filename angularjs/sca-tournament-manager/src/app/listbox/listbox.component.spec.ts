import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css']
})
export class ListboxComponent implements OnInit, AfterViewInit {
  container: HTMLElement | null = null;
  items: NodeListOf<HTMLElement> | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize container and items once the view has initialized
    this.container = this.el.nativeElement.querySelector('.scroll-container');
    this.items = this.el.nativeElement.querySelectorAll('.scroll-item');

    if (this.items) {
      this.items.forEach((item, index) => {
        // Add click event listener to each item
        item.addEventListener('click', () => this.scrollToItem(index));
      });
    }
  }

  scrollToItem(index: number): void {
    if (this.container && this.items) {
      // Calculate the position of the item
      const item = this.items[index];
      const top = item.offsetTop;

      // Scroll the container to that position
      this.container.scrollTop = top - this.container.offsetTop;
    }
  }
}
