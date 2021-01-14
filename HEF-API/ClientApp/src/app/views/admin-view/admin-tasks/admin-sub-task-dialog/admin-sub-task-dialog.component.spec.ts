import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubTaskDialogComponent } from './admin-sub-task-dialog.component';

describe('AdminSubTaskDialogComponent', () => {
  let component: AdminSubTaskDialogComponent;
  let fixture: ComponentFixture<AdminSubTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
