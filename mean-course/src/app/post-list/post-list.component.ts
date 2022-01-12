import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import { PostsService } from '../service/posts.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy {

 posts:Post[]=[];
 private postsSubs!: Subscription;



  constructor(
    public postService:PostsService
  ) { }

  ngOnInit(): void {

   //this.posts=
   this.postService.getPosts();
   this.postsSubs=this.postService.getPostUpdatedListener().subscribe((posts:Post[])=>{
     this.posts=posts;
   });
  }
  ngOnDestroy()
  {
    this.postsSubs.unsubscribe();
  }
  onDelete(postId:string)
  {
this.postService.deletePost(postId);
  }

}
