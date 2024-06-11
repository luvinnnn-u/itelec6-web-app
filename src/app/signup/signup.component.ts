// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   user = {
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   };
//   passwordsDoNotMatch = false; // Declare the passwordsDoNotMatch property
//   passwordVisible = false;

//   constructor(private http: HttpClient, private router: Router) {}

//   onSubmit() {
//     // Validate username and password
//     // Send sign-up request to backend
//     this.http.post('http://localhost:3000/api/auth/signup', this.user)
//    .subscribe(response => {
//         console.log(response);
//         this.router.navigate(['/signin']); // Navigate to sign-in page
//       }, error => {
//         console.error(error);
//       });
//   }

//   checkPasswordsMatch() {
//     this.passwordsDoNotMatch = this.user.password!== this.user.confirmPassword;
//   }
//   togglePasswordVisibility() {
//     this.passwordVisible =!this.passwordVisible;
//   }
// }

// // // src/app/signup/signup.component.ts

// // import { Component } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-signup',
// //   templateUrl: './signup.component.html',
// //   styleUrls: ['./signup.component.css']
// // })
// // export class SignupComponent {
// //   user = {
// //     username: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   };
// //   passwordsDoNotMatch = false;
// //   passwordVisible = false;
// //   errorMessage: string = ''; // Added for displaying errors

// //   constructor(private http: HttpClient, private router: Router) {}

// //   onSubmit() {
// //     if (!this.validatePassword(this.user.password)) {
// //       this.errorMessage = 'Password must be between 8 to 16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
// //       return;
// //     }

// //     if (this.user.password!== this.user.confirmPassword) {
// //       this.errorMessage = 'Passwords do not match.';
// //       return;
// //     }

// //     this.http.post('http://localhost:3000/api/auth/signup', this.user)
// //    .subscribe(response => {
// //         console.log(response);
// //         this.router.navigate(['/signin']); // Navigate to sign-in page after successful signup
// //       }, error => {
// //         console.error(error);
// //         this.errorMessage = error.error.message || 'Registration failed';
// //       });
// //   }

// //   checkPasswordsMatch() {
// //     this.passwordsDoNotMatch = this.user.password!== this.user.confirmPassword;
// //   }

// //   togglePasswordVisibility() {
// //     this.passwordVisible =!this.passwordVisible;
// //   }

// //   validatePassword(password: string): boolean {
// //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,16}$/;
// //     return regex.test(password);
// //   }
// // }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  passwordsDoNotMatch = false;
  passwordInvalid = false; // Add this property
  passwordVisible = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.isPasswordValid(this.user.password)) {
      this.passwordInvalid = true;
      this.errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      return;
    }

    if (this.passwordsDoNotMatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.http.post('http://localhost:3000/api/auth/signup', this.user)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/signin']);
      }, error => {
        console.error(error);
        this.errorMessage = error.error.message || 'Error signing up.';
      });
  }

  checkPasswordsMatch() {
    this.passwordsDoNotMatch = this.user.password !== this.user.confirmPassword;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  isPasswordValid(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  }
}
