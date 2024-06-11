import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditModalComponent } from './post-edit-modal.component';

describe('PostEditModalComponent', () => {
  let component: PostEditModalComponent;
  let fixture: ComponentFixture<PostEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEditModalComponent]
    });
    fixture = TestBed.createComponent(PostEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
