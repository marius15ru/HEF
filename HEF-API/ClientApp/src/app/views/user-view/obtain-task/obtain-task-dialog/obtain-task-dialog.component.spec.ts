import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainTaskDialogComponent } from './obtain-task-dialog.component';

describe('ObtainTaskDialogComponent', () => {
  let component: ObtainTaskDialogComponent;
  let fixture: ComponentFixture<ObtainTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtainTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtainTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
