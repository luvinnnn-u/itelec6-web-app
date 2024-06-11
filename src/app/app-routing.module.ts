
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './signup/signup.component';
// import { SigninComponent } from './signin/signin.component';
// import { PostListComponent } from './post-list/post-list.component';
// //auth guard para makasign out
// import { AuthGuard } from './auth.guard';

// const routes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'signin', component: SigninComponent },
//   //postlist
//   { path: 'post-list', component: PostListComponent },
//   // other routes...
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post/post-create.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'create-post', component: PostCreateComponent },
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
