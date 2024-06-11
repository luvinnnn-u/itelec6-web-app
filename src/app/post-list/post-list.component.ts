// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { PostService } from '../post.service';
// // import { Post } from '../post.model';
// // import { Subscription } from 'rxjs';
// // import { Router } from '@angular/router'; // Import Router

// // interface ApiResponse {
// //   message: string;
// //   posts: Post[];
// //   totalPages?: number;
// // }



// // @Component({
// //  selector: 'app-post-list',
// //  templateUrl: './post-list.component.html',
// //  styleUrls: ['./post-list.component.css']
// // })


// // export class PostListComponent implements OnInit, OnDestroy {
// //  currentPostToEdit: Post | null = null;
// //  posts: Post[] = [];
// //  private postsSub!: Subscription;
// //  currentPage = 1;
// //  limit = 4; 
// //  totalPages = 0;

// //  constructor(private postService: PostService, private router: Router) { } // Inject Router

// //  ngOnInit() {
// //     this.fetchPosts();
// //  }

// //  ngOnDestroy(): void {
// //     this.postsSub.unsubscribe();
// //  }

// // fetchPosts() {
// //   this.postsSub = this.postService.getPosts(this.currentPage, this.limit).subscribe((data: ApiResponse) => {
// //     console.log('API Response:', data); // Log the API response
// //     this.posts = data.posts;
// //     this.totalPages = data.totalPages || 1; // Use the totalPages value from the API response
// //     console.log('Total Pages:', this.totalPages); // Log the total pages
// //     this.updateBrowserAddress(); // Update browser address after fetching posts
// //   });
// // }

// //  deletePost(postId: string) {
// //     this.postService.deletePost(postId).subscribe(() => {
// //       console.log('Post deleted successfully');
// //       this.posts = this.posts.filter(post => post._id !== postId);
// //       this.fetchPosts(); // Refresh posts after deletion
// //     }, error => {
// //       console.error('Error deleting post:', error);
// //     });
// //  }

// //  editPost(postId: string) {
// //     const post = this.posts.find(post => post._id === postId) ?? null;
// //     if (post) {
// //       this.currentPostToEdit = post;
// //     }
// //  }

// //  updatePost(updatedPost: Post) {
// //     if (typeof updatedPost._id !== 'string') {
// //       console.error('Post ID is not a string:', updatedPost._id);
// //       return;
// //     }

// //     this.postService.updatePost(updatedPost._id, updatedPost).subscribe(
// //       response => {
// //         console.log('Post updated successfully', response);
// //         this.currentPostToEdit = null; // Close the modal or form
// //         this.fetchPosts(); // Refresh posts after update
// //       },
// //       error => {
// //         console.error('Error updating post', error);
// //       }
// //     );
// //  }

// //  nextPage() {
// //     if (this.currentPage < this.totalPages) {
// //       this.currentPage++;
// //       this.fetchPosts();
// //     }
// //  }

// //  previousPage() {
// //     if (this.currentPage > 1) {
// //       this.currentPage--;
// //       this.fetchPosts();
// //     }
// //  }

// //  updateBrowserAddress() {
// //   this.router.navigate([], {
// //     queryParams: { page: this.currentPage },
// //     queryParamsHandling: 'merge'
// //   });
// //  }
// // }


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { PostService } from '../post.service';
// import { Post } from '../post.model';
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router'; // Import Router

// interface ApiResponse {
//   message: string;
//   posts: Post[];
//   totalPages?: number;
// }

// @Component({
//   selector: 'app-post-list',
//   templateUrl: './post-list.component.html',
//   styleUrls: ['./post-list.component.css']
// })
// export class PostListComponent implements OnInit, OnDestroy {
//   currentPostToEdit: Post | null = null;
//   posts: Post[] = [];
//   private postsSub!: Subscription;
//   currentPage = 1;
//   limit = 4; 
//   totalPages = 0;
//   searchTerm: string = ''; // Add this line

//   constructor(private postService: PostService, private router: Router) { } // Inject Router

//   ngOnInit() {
//     this.fetchPosts();
//   }

//   ngOnDestroy(): void {
//     this.postsSub.unsubscribe();
//   }

//   fetchPosts() {
//     this.postsSub = this.postService.getPosts(this.currentPage, this.limit).subscribe((data: ApiResponse) => {
//       this.posts = data.posts;
//       this.totalPages = data.totalPages || 1;
//       this.updateBrowserAddress();
//     });
//   }

  
//  deletePost(postId: string) {
//     this.postService.deletePost(postId).subscribe(() => {
//       console.log('Post deleted successfully');
//       this.posts = this.posts.filter(post => post._id !== postId);
//       this.fetchPosts(); // Refresh posts after deletion
//     }, error => {
//       console.error('Error deleting post:', error);
//     });
//  }

//  editPost(postId: string) {
//     const post = this.posts.find(post => post._id === postId) ?? null;
//     if (post) {
//       this.currentPostToEdit = post;
//     }
//  }

//  updatePost(updatedPost: Post) {
//     if (typeof updatedPost._id !== 'string') {
//       console.error('Post ID is not a string:', updatedPost._id);
//       return;
//     }

//     this.postService.updatePost(updatedPost._id, updatedPost).subscribe(
//       response => {
//         console.log('Post updated successfully', response);
//         this.currentPostToEdit = null; // Close the modal or form
//         this.fetchPosts(); // Refresh posts after update
//       },
//       error => {
//         console.error('Error updating post', error);
//       }
//     );
//  }

//  nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.fetchPosts();
//     }
//  }

//  previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.fetchPosts();
//     }
//  }

//  updateBrowserAddress() {
//   this.router.navigate([], {
//     queryParams: { page: this.currentPage },
//     queryParamsHandling: 'merge'
//   });
//  }
// }


 

//   filterPosts(event: any): void {
//     const filteredPosts = this.posts.filter(post =>
//       post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//     this.filteredPosts = filteredPosts; // Use filteredPosts instead of posts in ngFor
//   }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

interface ApiResponse {
  message: string;
  posts: Post[];
  totalPages?: number;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  currentPostToEdit: Post | null = null;
  posts: Post[] = [];
  private postsSub!: Subscription;
  currentPage = 1;
  limit = 4; 
  totalPages = 0;
  searchTerm: string = '';
  filteredPosts: Post[] = []; // Define filteredPosts here

  constructor(private postService: PostService, private router: Router) { } // Inject Router

  ngOnInit() {
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  fetchPosts() {
    this.postsSub = this.postService.getPosts(this.currentPage, this.limit).subscribe((data: ApiResponse) => {
      this.posts = data.posts;
      this.totalPages = data.totalPages || 1;
      this.updateBrowserAddress();
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      console.log('Post deleted successfully');
      this.posts = this.posts.filter(post => post._id!== postId);
      this.fetchPosts(); // Refresh posts after deletion
    }, error => {
      console.error('Error deleting post:', error);
    });
  }

  editPost(postId: string) {
    const post = this.posts.find(post => post._id === postId)?? null;
    if (post) {
      this.currentPostToEdit = post;
    }
  }

  updatePost(updatedPost: Post) {
    if (typeof updatedPost._id!== 'string') {
      console.error('Post ID is not a string:', updatedPost._id);
      return;
    }

    this.postService.updatePost(updatedPost._id, updatedPost).subscribe(
      response => {
        console.log('Post updated successfully', response);
        this.currentPostToEdit = null; // Close the modal or form
        this.fetchPosts(); // Refresh posts after update
      },
      error => {
        console.error('Error updating post', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts();
    }
  }

  updateBrowserAddress() {
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  filterPosts(event: any): void {
    const filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredPosts = filteredPosts; // Now correctly uses the class property
  }
}