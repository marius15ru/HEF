import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubTaskHistoryDialogComponent } from './admin-sub-task-history-dialog.component';

describe('AdminSubTaskHistoryDialogComponent', () => {
  let component: AdminSubTaskHistoryDialogComponent;
  let fixture: ComponentFixture<AdminSubTaskHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubTaskHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubTaskHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
