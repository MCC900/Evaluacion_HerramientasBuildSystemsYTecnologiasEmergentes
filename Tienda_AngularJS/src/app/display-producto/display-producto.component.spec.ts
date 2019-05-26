import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductoComponent } from './display-producto.component';

describe('DisplayProductoComponent', () => {
  let component: DisplayProductoComponent;
  let fixture: ComponentFixture<DisplayProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
