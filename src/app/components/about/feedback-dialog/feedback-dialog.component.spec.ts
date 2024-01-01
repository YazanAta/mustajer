import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDialogComponent } from './feedback-dialog.component';

describe('FeedbackDialogComponent', () => {
  let component: FeedbackDialogComponent;
  let fixture: ComponentFixture<FeedbackDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackDialogComponent]
    });
    fixture = TestBed.createComponent(FeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
