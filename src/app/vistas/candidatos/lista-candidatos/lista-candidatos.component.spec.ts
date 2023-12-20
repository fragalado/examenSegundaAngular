import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCandidatosComponent } from './lista-candidatos.component';

describe('ListaCandidatosComponent', () => {
  let component: ListaCandidatosComponent;
  let fixture: ComponentFixture<ListaCandidatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCandidatosComponent]
    });
    fixture = TestBed.createComponent(ListaCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
