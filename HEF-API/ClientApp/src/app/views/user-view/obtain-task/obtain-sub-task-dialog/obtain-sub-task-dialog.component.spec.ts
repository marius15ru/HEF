import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainSubTaskDialogComponent } from './obtain-sub-task-dialog.component';

describe('ObtainSubTaskDialogComponent', () => {
  let component: ObtainSubTaskDialogComponent;
  let fixture: ComponentFixture<ObtainSubTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtainSubTaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtainSubTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
