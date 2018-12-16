import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links = [
    { link: 'product', text: 'Product' },
    { link: 'sample', text: 'Sample' },
    { link: 'xyz', text: 'xyz' }
  ];
}
