import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio1Component } from './bio1.component';

describe('Bio1Component', () => {
  let component: Bio1Component;
  let fixture: ComponentFixture<Bio1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
