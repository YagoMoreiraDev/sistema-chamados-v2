import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCalledTableComponent } from './all-called-table.component';

describe('AllCalledTableComponent', () => {
  let component: AllCalledTableComponent;
  let fixture: ComponentFixture<AllCalledTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCalledTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCalledTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
