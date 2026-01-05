import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsManagement } from './parcels-management';

describe('ParcelsManagement', () => {
  let component: ParcelsManagement;
  let fixture: ComponentFixture<ParcelsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelsManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
