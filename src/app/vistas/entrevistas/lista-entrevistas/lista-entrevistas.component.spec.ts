import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrevistasComponent } from './lista-entrevistas.component';

describe('ListaEntrevistasComponent', () => {
  let component: ListaEntrevistasComponent;
  let fixture: ComponentFixture<ListaEntrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEntrevistasComponent]
    });
    fixture = TestBed.createComponent(ListaEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
