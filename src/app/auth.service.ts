import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isAuthenticated = false;

//   constructor() {
//     this.isAuthenticated =!!localStorage.getItem('token');
//   }

//   login(token: string): void {
//     localStorage.setItem('token', token);
//     this.isAuthenticated = true;
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isAuthenticated = false;
//   }

//   checkAuthentication(): boolean {
//     return this.isAuthenticated;
//   }
// }