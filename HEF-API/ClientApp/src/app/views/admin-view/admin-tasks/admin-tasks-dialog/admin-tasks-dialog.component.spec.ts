import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTasksDialogComponent } from './admin-tasks-dialog.component';

describe('AdminTasksDialogComponent', () => {
  let component: AdminTasksDialogComponent;
  let fixture: ComponentFixture<AdminTasksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTasksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
