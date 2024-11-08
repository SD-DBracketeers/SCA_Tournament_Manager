import { Component } from '@angular/core';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.css']
})
export class ToTopComponent {
  // Scroll to the top of the page when the button is clicked
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
