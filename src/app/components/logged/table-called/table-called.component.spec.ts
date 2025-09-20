import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCalledComponent } from './table-called.component';

describe('TableCalledComponent', () => {
  let component: TableCalledComponent;
  let fixture: ComponentFixture<TableCalledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCalledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
