// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { PostCreateComponent } from './post/post-create.component';
// import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {HeaderComponent} from './header/header.component'
// //from angular material
// import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {  MatToolbarModule } from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// //flex
// import { FlexLayoutModule } from '@angular/flex-layout';
// //expansion 2/13
// import {MatExpansionModule} from '@angular/material/expansion';
// import {PostListComponent} from './post-list/post-list.component';
// //http client 2/27
// import { HttpClientModule } from '@angular/common/http';
// import { PostEditModalComponent } from './post-edit-modal/post-edit-modal.component';
// import { SignupComponent } from './signup/signup.component';
// import { SigninComponent } from './signin/signin.component';
// //rourtes
// import { Routes, RouterModule } from '@angular/router';
// //dialog
// import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



// //routes for sign in
// const routes: Routes = [
//   { path: 'signin', component: SigninComponent },
//   { path: 'posts', component: PostListComponent },
//   // Redirect to 'signin' route as the default route
//   { path: '', redirectTo: '/signin', pathMatch: 'full' },
//  ];


// @NgModule({
//   declarations: [
//     AppComponent,
//     PostCreateComponent,
//     HeaderComponent,
//     PostListComponent,
//     PostEditModalComponent,
//     SignupComponent,
//     SigninComponent,
//     ConfirmDialogComponent,
//       ],



//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     BrowserAnimationsModule,
//     MatInputModule,
//     MatCardModule,
//     MatButtonModule,
//     MatToolbarModule,
//     MatIconModule,
//     FlexLayoutModule,
//     MatExpansionModule,
//     HttpClientModule,
//     RouterModule.forRoot(routes), // Include your routes here
    
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })

// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './post/post-create.component';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditModalComponent } from './post-edit-modal/post-edit-modal.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Routes, RouterModule } from '@angular/router';

// //routes for sign in
const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'posts', component: PostListComponent },
  // Redirect to 'signin' route as the default route
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
 ];

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    PostEditModalComponent,
    SignupComponent,
    SigninComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule, // Add MatDialogModule here
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    HttpClientModule,
    RouterModule.forRoot([]) // Make sure your routes are correctly configured here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
