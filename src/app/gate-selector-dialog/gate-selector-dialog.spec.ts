import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateSelectorDialog } from './gate-selector-dialog';

describe('GateSelectorDialog', () => {
  let component: GateSelectorDialog;
  let fixture: ComponentFixture<GateSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateSelectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
