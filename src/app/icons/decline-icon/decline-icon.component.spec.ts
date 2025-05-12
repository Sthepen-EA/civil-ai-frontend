import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineIconComponent } from './decline-icon.component';

describe('DeclineIconComponent', () => {
  let component: DeclineIconComponent;
  let fixture: ComponentFixture<DeclineIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclineIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
