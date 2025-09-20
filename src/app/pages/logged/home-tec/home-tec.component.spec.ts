import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTecComponent } from './home-tec.component';

describe('HomeTecComponent', () => {
  let component: HomeTecComponent;
  let fixture: ComponentFixture<HomeTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
