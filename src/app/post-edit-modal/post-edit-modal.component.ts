
//for edit submit and cancel
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-edit-modal',
  templateUrl: './post-edit-modal.component.html',
  styleUrls: ['./post-edit-modal.component.css']
})
export class PostEditModalComponent {
  @Input() post!: Post;   // i made it null
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();
 
  onSubmit() {
     this.postUpdated.emit(this.post);
  }
 
  onCancel() {
     this.cancel.emit();
  }

}
