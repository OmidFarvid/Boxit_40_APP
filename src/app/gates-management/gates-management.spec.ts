import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatesManagement } from './gates-management';

describe('GatesManagement', () => {
  let component: GatesManagement;
  let fixture: ComponentFixture<GatesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatesManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
