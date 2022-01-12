import { Injectable } from '@angular/core';
import {Post} from 'src/app/post-list/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { string } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

private posts:Post[]=[];
private postUpdated=new Subject<Post[]>();


getPosts()
{
  this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts').pipe(map((postData)=>{
return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
  return {
    title:post.title,
    content:post.content,
    id:post._id
  };
});
  })).subscribe((transformedPosts)=>{
    this.posts=transformedPosts;
    this.postUpdated.next([...this.posts]);
  });
}


getPostUpdatedListener()
{
  return this.postUpdated.asObservable();
}



addPost(title:string,content:string)
{
  const post:Post={id:'1s',title: title,content: content };
  this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
    console.log(responseData.message);
    const id=responseData.postId;
    post.id=id;
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  });

}


deletePost(postId:string)
{
  this.http.delete("http://localhost:3000/api/posts/"+ postId).subscribe(()=>{
    const updatedPosts=this.posts.filter(post=>post.id!==postId);
    this.posts=updatedPosts;
    this.postUpdated.next([...this.posts]);
  });
}
  constructor(
    private http:HttpClient
  ) { }
}
