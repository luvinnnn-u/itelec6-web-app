// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.css']
// })
// export class ConfirmDialogComponent {

// }

// import { Component, Input } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-confirm-dialog',
//   template: `
//     <h1 mat-dialog-title>Confirmation</h1>
//     <mat-dialog-content>{{data.message}}</mat-dialog-content>
//     <div mat-dialog-actions>
//       <button mat-button (click)="onNoClick()">Cancel</button>
//       <button mat-button cdkFocusInitial (click)="onOkClick()" color="warn">OK</button>
//     </div>
//   `,
// })
// export class ConfirmDialogComponent {
//   @Input() data: any;

//   constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

//   onNoClick(): void {
//     this.dialogRef.close(false);
//   }

//   onOkClick(): void {
//     this.dialogRef.close(true);
//   }
// }
// Remove the duplicate class declaration and the conflicting import statement

// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router'; // Ensure this import is correct

// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.css']
// })
// export class ConfirmDialogComponent {

//   constructor(
//     public dialog: MatDialog,
//     private router: Router // Inject Router here
//   ) {}

//   showConfirmDialog(): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '250px',
//       data: {message: 'Are you sure you want to sign out?'}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.logout();
//       }
//     });
//   }

//   logout(): void {
//     // Perform sign-out actions here
//     // For example, remove the token from local storage and navigate to the sign-in page
//     localStorage.removeItem('token');
//     this.router.navigate(['/signin']); // Now router is available
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onOkClick()" color="warn">OK</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
