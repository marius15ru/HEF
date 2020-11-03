import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEquipmentDialogComponent } from './admin-equipment-dialog.component';

describe('AdminEquipmentDialogComponent', () => {
  let component: AdminEquipmentDialogComponent;
  let fixture: ComponentFixture<AdminEquipmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEquipmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEquipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
