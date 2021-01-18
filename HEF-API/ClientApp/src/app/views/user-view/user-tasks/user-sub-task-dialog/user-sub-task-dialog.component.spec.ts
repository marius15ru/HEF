import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubTaskDialogComponent } from './user-sub-task-dialog.component';

describe('UserSubTaskDialogComponent', () => {
  let component: UserSubTaskDialogComponent;
  let fixture: ComponentFixture<UserSubTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
