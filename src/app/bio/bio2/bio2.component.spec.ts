import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio2Component } from './bio2.component';

describe('Bio2Component', () => {
  let component: Bio2Component;
  let fixture: ComponentFixture<Bio2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
