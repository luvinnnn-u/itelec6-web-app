

//for pagination but the above code it works
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
 providedIn: 'root',
})
export class PostService {
 private posts: Post[] = [];
 private postsUpdated = new Subject<Post[]>();
 private apiUrl = 'http://localhost:3000/api/posts';
 private postAddedSource = new Subject<void>();
 postAdded = this.postAddedSource.asObservable();
 postDeleted: any;

 constructor(private http: HttpClient) { }

 private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 };

 getPosts(page: number = 1, limit: number = 4): Observable<{ message: string; posts: Post[] }> {
    return this.http.get<{ message: string; posts: Post[] }>(`${this.apiUrl}?page=${page}&limit=${limit}`).pipe(
      tap(data => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
      })
    );
 }

 getPostUpdateListener() {
    return this.postsUpdated.asObservable();
 }

 deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`);
 }

 addPost(title: string, content: string, imageUrl: string): Observable<any> {
    const post: Post = { title: title, content: content, imageUrl: imageUrl };
    return this.http.post<{ message: string }>(this.apiUrl, post).pipe(
      tap((response: any) => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
    );
 }

 uploadImage(Image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', Image);
    return this.http.post('http://localhost:3000/api/posts', formData);
 }

 updatePost(postId: string, updatedPost: Post): Observable<any> {
    return this.http.put(`/api/posts/${postId}`, updatedPost);
 }
}
  

  
