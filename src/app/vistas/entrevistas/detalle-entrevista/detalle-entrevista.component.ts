import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from 'src/app/modelos/candidato';
import { DatosEntrevista, Entrevista } from 'src/app/modelos/entrevista';
import { Puesto } from 'src/app/modelos/puesto';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-entrevista',
  templateUrl: './detalle-entrevista.component.html',
  styleUrls: ['./detalle-entrevista.component.css']
})
export class DetalleEntrevistaComponent {

  id?: any;
  selectedPuesto?: Puesto;
  selectedCandidato?: Candidato;
  puestos?: Puesto[];
  candidatos?: Candidato[];

  datosEntrevista: DatosEntrevista = { fechaEntrevista: "", idCandidato: "", idPuesto: "", realizada: false };
  constructor(private dbs: DatabaseService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id") != null) {
      this.id = this.route.snapshot.paramMap.get("id");

      // Si tenemos id buscamos la entrevista en la base de datos
      this.obtieneEntrevista();
    } else {
      // Obtenemos los puestos
      this.obtienePuestos();

      // Obtenemos los candidatos
      this.obtieneCandidatos();
    }
  }

  obtieneEntrevista() {
    this.dbs.getDocumentById(this.id, "entrevistas").subscribe(res => {
      this.datosEntrevista = res;

      this.dbs.getCollection("puestos").subscribe(res2 => {
        this.puestos = res2;

        this.dbs.getCollection("candidatos").subscribe(res3 => {
          this.candidatos = res3;

          // Ahora con el idPuesto y idCandidato obtenemos el puesto y el candidato
          this.selectedPuesto = this.puestos?.find(element => element.id == this.datosEntrevista?.idPuesto);
          if (this.selectedPuesto != undefined) {
            // Ahora filtramos la lista puestos para quitar el puesto seleccionado
            this.puestos = this.puestos?.filter(element => element.id !== this.selectedPuesto?.id);
          }

          this.selectedCandidato = this.candidatos?.find(element => element.id === this.datosEntrevista?.idCandidato);
          if (this.selectedCandidato != undefined) {
            // Ahora filtramos la lista candidatos para quitar el candidato seleccionado
            this.candidatos = this.candidatos?.filter(element => element.id !== this.selectedCandidato?.id);
          }
        })
      })
    })
  }

  obtienePuestos() {
    this.dbs.getCollection("puestos").subscribe(res => this.puestos = res);
  }

  obtieneCandidatos() {
    this.dbs.getCollection("candidatos").subscribe(res => this.candidatos = res);
  }

  // Método que se activará cuando se le de al botón de enviar
  // Comprueba si hay id o no
  // Si hay id llama a actualiza y si no hay llama a crea
  enviar() {
    console.log("Realizada: " + this.datosEntrevista.realizada);
    if (this.id)
      this.actualizaEntrevista();
    else
      this.creaEntrevista();

    // Mandamos a la vista listado
    this.router.navigateByUrl("/entrevistas/listado");
  }

  // Método que actualiza una entrevista en la base de datos
  actualizaEntrevista() {
    this.dbs.updateDocument(this.datosEntrevista, "entrevistas")
      .then(() => Swal.fire({
        title: "Actualizado",
        text: "La entrevista se ha actualizado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops...",
        text: "La entrevista no se ha actualizado",
        icon: "error"
      }));
  }

  // Método que crea una entrevista en la base de datos
  creaEntrevista() {
    this.dbs.newDocument(this.datosEntrevista, "entrevistas")
      .then(() => Swal.fire({
        title: "Creado",
        text: "La entrevista se ha creado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "La entrevista no se ha creado",
        icon: "error"
      }));
  }
}
