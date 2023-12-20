import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPuestosComponent } from './lista-puestos.component';

describe('ListaPuestosComponent', () => {
  let component: ListaPuestosComponent;
  let fixture: ComponentFixture<ListaPuestosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPuestosComponent]
    });
    fixture = TestBed.createComponent(ListaPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
