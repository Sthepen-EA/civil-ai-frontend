import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimateTableComponent } from './cost-estimate-table.component';

describe('CostEstimateTableComponent', () => {
  let component: CostEstimateTableComponent;
  let fixture: ComponentFixture<CostEstimateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostEstimateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostEstimateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
