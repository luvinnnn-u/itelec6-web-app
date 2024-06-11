// import { Component } from '@angular/core';
// import {Post} from './post.model';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'meanstack_proj';
// }


// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {} // Inject AuthService
}
