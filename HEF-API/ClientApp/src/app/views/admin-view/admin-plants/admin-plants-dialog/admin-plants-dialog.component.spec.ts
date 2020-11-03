import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlantsDialogComponent } from './admin-plants-dialog.component';

describe('AdminPlantsDialogComponent', () => {
  let component: AdminPlantsDialogComponent;
  let fixture: ComponentFixture<AdminPlantsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlantsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
