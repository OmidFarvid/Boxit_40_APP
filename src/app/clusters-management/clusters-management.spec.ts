import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustersManagement } from './clusters-management';

describe('ClustersManagement', () => {
  let component: ClustersManagement;
  let fixture: ComponentFixture<ClustersManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClustersManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClustersManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
