import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  imageUrl = '';
  posts: Post[] = []; // Added for local display (optional)

  @Output() postCreated = new EventEmitter<Post>();

  constructor(private postService: PostService) {} // Removed comma after PostService

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

//dati yan working ipalit muna nago below
//     const post: Post = { title: form.value.title, content: form.value.content };

//     this.postService.addPost(post.title, post.content).subscribe(response => {
//       console.log(response);
//       this.postCreated.emit(post); // Emit the created post

//       // If desired, update local posts array for immediate display
//       this.posts.push(post);
//       form.reset();
//     });
//   }
// }
const post: Post = { title: form.value.title, content: form.value.content, imageUrl: form.value.imageUrl };
// const post: Post = { 
//   title: form.value.title || '', 
//   content: form.value.content || '', 
//   imageUrl: form.value.imageUrl || '' 
//  };
 this.postService.addPost(post.title, post.content, post.imageUrl || '').subscribe(response => {
    console.log(response);
    this.postCreated.emit(post); // Emit the created post

    // If desired, update local posts array for immediate display
    this.posts.push(post);
    form.reset();
 });
}}
// // import { Component, EventEmitter, Output } from '@angular/core';
// // import { NgForm } from '@angular/forms';
// // import { Post } from '../post.model';
// // import { PostService } from '../post.service';
// // //post

// // @Component({
// //  selector: 'app-post-create',
// //  templateUrl: './post-create.component.html',
// //  styleUrls: ['./post-create.component.css']
// // })
// // export class PostCreateComponent {
// //  enteredTitle = '';
// //  enteredContent = '';
// // // selectedFile: File = null; // Add this line to store the selected file
// // selectedFile?: File; 
// //  posts: Post[] = [];

// //  @Output() postCreated = new EventEmitter<Post>();

// //  constructor(private postService: PostService) {}

// //  onFileChange(event: Event) {
// //     const inputElement = event.target as HTMLInputElement;
// //     if (inputElement.files && inputElement.files.length > 0) {
// //       this.selectedFile = inputElement.files[0];
// //     }
// //  }

// //  onAddPost(form: NgForm) {
// //     if (form.invalid) {
// //       return;
// //     }

// //     const post: Post = { title: form.value.title, content: form.value.content };

// //     // Create a FormData object to send the post data and the image file
// //     const formData = new FormData();
// //     formData.append('title', post.title);
// //     formData.append('content', post.content);
// //     if (this.selectedFile) {
// //       formData.append('image', this.selectedFile, this.selectedFile.name);
// //     }

// //     this.postService.createPost(formData).subscribe(response => {
// //       console.log(response);
// //       this.postCreated.emit(post); // Emit the created post

// //       // If desired, update local posts array for immediate display
// //       this.posts.push(post);
// //       form.reset();
// //     });
// //  }
// // }

// import { Component, EventEmitter, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Post } from '../post.model';
// import { PostService } from '../post.service';

// @Component({
//   selector: 'app-post-create',
//   templateUrl: './post-create.component.html',
//   styleUrls: ['./post-create.component.css']
// })
// export class PostCreateComponent {
//   enteredTitle = '';
//   enteredContent = '';
//   selectedFile: File | null = null; // Store the selected file

//   constructor(private postService: PostService) {}

//   onFileChange(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files && inputElement.files.length > 0) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   onAddPost(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }

//     const post: Post = { title: form.value.title, content: form.value.content };

//     // Create a FormData object to send the post data and the image file
//     const formData = new FormData();
//     formData.append('title', post.title);
//     formData.append('content', post.content);
//     if (this.selectedFile) {
//       formData.append('image', this.selectedFile, this.selectedFile.name);
//     }

//     this.postService.createPost(formData).subscribe(response => {
//       console.log(response);
//       // Handle response as needed
//       form.reset();
//     });
//   }

//   // onSubmit(postData: any) {
//   //   this.postService.createPost(postData).subscribe(response => {
//   //     console.log('Post created successfully:', response);
//   //     // Handle success, if needed
//   //   }, error => {
//   //     console.error('Error creating post:', error);
//   //     // Handle error, if needed
//   //   });
//   // }
// }
