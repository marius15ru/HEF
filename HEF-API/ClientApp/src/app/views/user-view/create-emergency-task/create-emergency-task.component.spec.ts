import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmergencyTaskComponent } from './create-emergency-task.component';

describe('CreateEmergencyTaskComponent', () => {
  let component: CreateEmergencyTaskComponent;
  let fixture: ComponentFixture<CreateEmergencyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmergencyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmergencyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
