import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGatesManagement } from './session-gates-management';

describe('SessionGatesManagement', () => {
  let component: SessionGatesManagement;
  let fixture: ComponentFixture<SessionGatesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionGatesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionGatesManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
