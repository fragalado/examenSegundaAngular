import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatosComponent } from './candidatos.component';
import { ListaCandidatosComponent } from './lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from './detalle-candidato/detalle-candidato.component';

const routes: Routes = [
  { path: '', component: CandidatosComponent, children: [
    { path: "listado", component: ListaCandidatosComponent },
    { path: "detalle/:id", component: DetalleCandidatoComponent },
    { path: "agregar", component: DetalleCandidatoComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatosRoutingModule { }
