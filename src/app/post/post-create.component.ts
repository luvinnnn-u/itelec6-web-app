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
  posts: Post[] = []; // Added for local display (optional)

  @Output() postCreated = new EventEmitter<Post>();

  constructor(private postService: PostService) {} // Removed comma after PostService

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const post: Post = { title: form.value.title, content: form.value.content };

    this.postService.addPost(post.title, post.content).subscribe(response => {
      console.log(response);
      this.postCreated.emit(post); // Emit the created post

      // If desired, update local posts array for immediate display
      this.posts.push(post);
      form.reset();
    });
  }
}