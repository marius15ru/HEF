import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffDialogComponent } from './admin-staff-dialog.component';

describe('AdminStaffDialogComponent', () => {
  let component: AdminStaffDialogComponent;
  let fixture: ComponentFixture<AdminStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
