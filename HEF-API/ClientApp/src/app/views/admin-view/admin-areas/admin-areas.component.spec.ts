import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreasComponent } from './admin-areas.component';

describe('AdminAreasComponent', () => {
  let component: AdminAreasComponent;
  let fixture: ComponentFixture<AdminAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
