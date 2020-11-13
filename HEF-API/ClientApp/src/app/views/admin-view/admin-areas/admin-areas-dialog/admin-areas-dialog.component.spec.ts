import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreasDialogComponent } from './admin-areas-dialog.component';

describe('AdminAreasDialogComponent', () => {
  let component: AdminAreasDialogComponent;
  let fixture: ComponentFixture<AdminAreasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAreasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
