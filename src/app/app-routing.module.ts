import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './vistas/core/bienvenida/bienvenida.component';

const routes: Routes = [
  { path: "", component: BienvenidaComponent},
  { path: 'candidatos', loadChildren: () => import('./vistas/candidatos/candidatos.module').then(m => m.CandidatosModule) },
  { path: 'entrevistas', loadChildren: () => import('./vistas/entrevistas/entrevistas.module').then(m => m.EntrevistasModule) },
  { path: 'puestos', loadChildren: () => import('./vistas/puestos/puestos.module').then(m => m.PuestosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
