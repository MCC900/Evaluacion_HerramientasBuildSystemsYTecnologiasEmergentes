import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetalladoProductoComponent } from './display-detallado-producto.component';

describe('DisplayDetalladoProductoComponent', () => {
  let component: DisplayDetalladoProductoComponent;
  let fixture: ComponentFixture<DisplayDetalladoProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDetalladoProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDetalladoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
