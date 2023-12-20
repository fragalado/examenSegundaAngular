import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';
import { ListaPuestosComponent } from './lista-puestos/lista-puestos.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PuestosComponent,
    ListaPuestosComponent,
    DetallePuestoComponent
  ],
  imports: [
    CommonModule,
    PuestosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PuestosModule { }
