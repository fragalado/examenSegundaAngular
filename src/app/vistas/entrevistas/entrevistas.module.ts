import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrevistasRoutingModule } from './entrevistas-routing.module';
import { EntrevistasComponent } from './entrevistas.component';
import { ListaEntrevistasComponent } from './lista-entrevistas/lista-entrevistas.component';
import { DetalleEntrevistaComponent } from './detalle-entrevista/detalle-entrevista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntrevistasComponent,
    ListaEntrevistasComponent,
    DetalleEntrevistaComponent
  ],
  imports: [
    CommonModule,
    EntrevistasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EntrevistasModule { }
