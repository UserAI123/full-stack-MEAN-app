import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Post} from 'src/app/post-list/post.model';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


 enteredTitle="";
 enteredContent="";
  constructor(
    public postService:PostsService
  ) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm)
  {
    if(form.invalid)
    {
      return;
    }

  //const post={
 //   title:form.value.title,
  //  content:form.value.content
  //};
this.postService.addPost(form.value.title,form.value.content);
form.resetForm();

  }

}
