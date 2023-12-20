import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatosRoutingModule } from './candidatos-routing.module';
import { CandidatosComponent } from './candidatos.component';
import { ListaCandidatosComponent } from './lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from './detalle-candidato/detalle-candidato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidatosComponent,
    ListaCandidatosComponent,
    DetalleCandidatoComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CandidatosModule { }
