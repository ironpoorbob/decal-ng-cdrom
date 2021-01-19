import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio3Component } from './bio3.component';

describe('Bio3Component', () => {
  let component: Bio3Component;
  let fixture: ComponentFixture<Bio3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
