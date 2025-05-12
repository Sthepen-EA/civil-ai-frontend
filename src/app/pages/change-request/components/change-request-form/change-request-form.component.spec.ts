import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestFormComponent } from './change-request-form.component';

describe('ChangeRequestFormComponent', () => {
  let component: ChangeRequestFormComponent;
  let fixture: ComponentFixture<ChangeRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
