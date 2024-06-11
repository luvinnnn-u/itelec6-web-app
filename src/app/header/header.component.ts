
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog, private router: Router) {}

  showConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to sign out?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {
    // Perform sign-out actions here
    // For example, remove the token from local storage and navigate to the sign-in page
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}

// // header.component.ts
// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { AuthService } from '../auth.service'; // Import AuthService

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   constructor(
//     public dialog: MatDialog,
//     private router: Router,
//     private authService: AuthService // Inject AuthService
//   ) {}

//   showConfirmDialog(): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '250px',
//       data: { message: 'Are you sure you want to sign out?' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.logout();
//       }
//     });
//   }

//   logout(): void {
//     this.authService.logout(); // Use AuthService to logout
//     this.router.navigate(['/signin']);
//   }
// }
