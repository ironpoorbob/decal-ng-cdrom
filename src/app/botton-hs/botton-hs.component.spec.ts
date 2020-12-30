import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonHsComponent } from './botton-hs.component';

describe('BottonHsComponent', () => {
  let component: BottonHsComponent;
  let fixture: ComponentFixture<BottonHsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottonHsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonHsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
