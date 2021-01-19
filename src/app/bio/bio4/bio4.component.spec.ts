import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bio4Component } from './bio4.component';

describe('Bio4Component', () => {
  let component: Bio4Component;
  let fixture: ComponentFixture<Bio4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bio4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bio4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
