import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
//import 2/28
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string; posts: Post[] }>(this.apiUrl).subscribe(data => {
      this.posts = data.posts;
      this.postsUpdated.next([...this.posts]);
    });
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // addPost(title: string, content: string) {
  //   const post: Post = { title: title, content: content };
  //   this.http.post<{ message: string }>(this.apiUrl, post).subscribe(response => {
  //     console.log(response.message);
  //     this.posts.push(post);
  //     this.postsUpdated.next([...this.posts]);
  //   }

  // addPost(title: string, content: string): Observable<any> {
  //   const post: Post = { title: title, content: content };
  //   return this.http.post<{ message: string }>(this.apiUrl, post);
  //  }
  // }
  addPost(title: string, content: string): Observable<any> {
    const post: Post = { title: title, content: content };
    return this.http.post<{ message: string }>(this.apiUrl, post).pipe(
       tap((response: any) => {
         // Assuming the response contains the created post
         this.posts.push(post);
         this.postsUpdated.next([...this.posts]);
       })
    );
   }
  }
