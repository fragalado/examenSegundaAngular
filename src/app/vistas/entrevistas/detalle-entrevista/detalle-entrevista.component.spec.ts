import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEntrevistaComponent } from './detalle-entrevista.component';

describe('DetalleEntrevistaComponent', () => {
  let component: DetalleEntrevistaComponent;
  let fixture: ComponentFixture<DetalleEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEntrevistaComponent]
    });
    fixture = TestBed.createComponent(DetalleEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
