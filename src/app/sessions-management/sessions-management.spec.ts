import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsManagement } from './sessions-management';

describe('SessionsManagement', () => {
  let component: SessionsManagement;
  let fixture: ComponentFixture<SessionsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
