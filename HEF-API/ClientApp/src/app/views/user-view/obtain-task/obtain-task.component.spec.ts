import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainTaskComponent } from './obtain-task.component';

describe('ObtainTaskComponent', () => {
  let component: ObtainTaskComponent;
  let fixture: ComponentFixture<ObtainTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtainTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtainTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
