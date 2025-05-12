import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimateFormComponent } from './cost-estimate-form.component';

describe('CostEstimateFormComponent', () => {
  let component: CostEstimateFormComponent;
  let fixture: ComponentFixture<CostEstimateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostEstimateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostEstimateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
