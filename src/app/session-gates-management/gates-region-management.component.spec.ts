import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatesRegionManagement } from './gates-region-management.component';

describe('SessionGatesManagement', () => {
  let component: GatesRegionManagement;
  let fixture: ComponentFixture<GatesRegionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatesRegionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatesRegionManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
