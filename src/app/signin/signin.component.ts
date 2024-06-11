import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // onSubmit() {
  //   this.http.post<AuthResponse>('http://localhost:3000/api/auth/signin', this.user)
  //     .subscribe((response: AuthResponse) => {
  //       console.log(response);
  //       if (response.message === 'Signed in successfully') {
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/post-list']);
  //       }
  //     }, error => {
  //       console.error(error);
  //       this.errorMessage = error.error.message || 'Invalid credentials';
  //     });
  // }

  // In your sign-in.component.ts
  // onSubmit() {
  //   this.http.post<AuthResponse>('http://localhost:3000/api/auth/signin', this.user)
  //    .subscribe({
  //       next: (response: AuthResponse) => {
  //         console.log(response);
  //         if (response.message === 'Signed in successfully') {
  //           localStorage.setItem('token', response.token);
  //           this.router.navigate(['/post-list']);
  //         } else if (response.message === 'Account locked. Please wait for 5 minutes to retry.') {
  //           alert('Your account is locked. Please wait for 5 minutes to retry.');
  //         } else {
  //           // Handle unexpected messages or errors here
  //           console.error('Unexpected response:', response);
  //           this.errorMessage = 'An unknown error occurred.';
  //         }
  //       },
  //       error: (error: any) => {
  //         console.error(error);
  //         this.errorMessage = error?.message || 'An error occurred during sign-in.';
  //       }
  //     });
  // }
  onSubmit() {
    this.http.post<AuthResponse>('http://localhost:3000/api/auth/signin', this.user)
     .subscribe({
        next: (response: AuthResponse) => {
          console.log(response);
          if (response.message === 'Signed in successfully') {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/post-list']);
          } else if (response.message === 'Account locked. Please wait for 5 minutes to retry.') {
            alert('Your account is locked. Please wait for 5 minutes to retry.');
          } else {
            // Handle unexpected messages or errors here
            console.error('Unexpected response:', response);
            this.errorMessage = 'An unknown error occurred.';
          }
        },
        error: (error: any) => {
          console.error(error);
          // Check if the error is due to a 429 status code
          if (error.status === 429) {
            this.errorMessage = 'Your account is locked. Please wait for 5 minutes to retry.';
          } else {
            this.errorMessage = error?.message || 'An error occurred during sign-in.';
          }
        }
      });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
