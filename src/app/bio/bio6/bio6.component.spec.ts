import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio6Component } from './bio6.component';

describe('Bio6Component', () => {
  let component: Bio6Component;
  let fixture: ComponentFixture<Bio6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
