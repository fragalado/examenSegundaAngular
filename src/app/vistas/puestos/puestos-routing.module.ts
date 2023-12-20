import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuestosComponent } from './puestos.component';
import { ListaPuestosComponent } from './lista-puestos/lista-puestos.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';

const routes: Routes = [
  {
    path: '', component: PuestosComponent, children: [
      { path: "listado", component: ListaPuestosComponent },
      { path: "detalle/:id", component: DetallePuestoComponent },
      { path: "agregar", component: DetallePuestoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestosRoutingModule { }
