import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInstructionsComponent } from './user-instructions.component';

describe('UserInstructionsComponent', () => {
  let component: UserInstructionsComponent;
  let fixture: ComponentFixture<UserInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
