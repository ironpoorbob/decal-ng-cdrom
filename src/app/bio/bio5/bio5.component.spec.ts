import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio5Component } from './bio5.component';

describe('Bio5Component', () => {
  let component: Bio5Component;
  let fixture: ComponentFixture<Bio5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
