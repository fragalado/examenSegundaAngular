import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrevistasComponent } from './entrevistas.component';
import { ListaEntrevistasComponent } from './lista-entrevistas/lista-entrevistas.component';
import { DetalleEntrevistaComponent } from './detalle-entrevista/detalle-entrevista.component';

const routes: Routes = [
  { path: '', component: EntrevistasComponent, children: [
    { path: "listado", component: ListaEntrevistasComponent },
    { path: "detalle/:id", component: DetalleEntrevistaComponent },
    { path: "agregar", component: DetalleEntrevistaComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrevistasRoutingModule { }
