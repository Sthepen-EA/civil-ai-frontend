import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchiconComponent } from './searchicon.component';

describe('SearchiconComponent', () => {
  let component: SearchiconComponent;
  let fixture: ComponentFixture<SearchiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchiconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
