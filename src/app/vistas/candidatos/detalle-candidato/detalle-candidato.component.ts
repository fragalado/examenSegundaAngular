import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from 'src/app/modelos/candidato';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-candidato',
  templateUrl: './detalle-candidato.component.html',
  styleUrls: ['./detalle-candidato.component.css']
})
export class DetalleCandidatoComponent {

  id?: any;
  candidato: Candidato = {nombre: "", apellidos: "", dni: "", direccion: "", telefono: "", mail: "", fechaNacimiento: ""}
  formCandidato = this.formBuilder.group({
    nombre: [this.candidato.nombre, Validators.required],
    apellidos: [this.candidato.apellidos, Validators.required],
    dni: [this.candidato.dni, Validators.required],
    direccion: [this.candidato.direccion, Validators.required],
    telefono: [this.candidato.telefono, Validators.required],
    mail: [this.candidato.mail, Validators.required],
    fechaNacimiento: [this.candidato.fechaNacimiento, Validators.required] // Formato: 2023-12-20
  })

  constructor(private formBuilder: FormBuilder, private dbs: DatabaseService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(){
    if(this.route.snapshot.paramMap.get("id") != null){
      this.id = this.route.snapshot.paramMap.get("id");

      // Si tenemos id buscamos el candidato en la base de datos
      this.dbs.getDocumentById(this.id, "candidatos").subscribe(res => {
        this.candidato = res

        // Actualizamos los datos del formulario
        this.formCandidato.patchValue({
          nombre: this.candidato.nombre,
          apellidos: this.candidato.apellidos,
          dni: this.candidato.dni,
          direccion: this.candidato.direccion,
          telefono: this.candidato.telefono,
          mail: this.candidato.mail,
          fechaNacimiento: this.candidato.fechaNacimiento
        })
      });
    }
  }

  // Método que se activará cuando se le de al botón de enviar
  // Comprueba si hay id o no
  // Si hay id llama a actualiza y si no hay llama a crea
  enviar(){
    // Actualizamos el candidato con los datos del formulario
    this.candidato.nombre = this.formCandidato.controls["nombre"].value!;
    this.candidato.apellidos = this.formCandidato.controls["apellidos"].value!;
    this.candidato.dni = this.formCandidato.controls["dni"].value!;
    this.candidato.direccion = this.formCandidato.controls["direccion"].value!;
    this.candidato.telefono = this.formCandidato.controls["telefono"].value!;
    this.candidato.mail = this.formCandidato.controls["mail"].value!;
    this.candidato.fechaNacimiento = this.formCandidato.controls["fechaNacimiento"].value!;

    if(this.id)
      this.actualizaCandidato();
    else 
      this.creaCandidato();

    // Mandamos a la vista listado
    this.router.navigateByUrl("/candidatos/listado");
  }

  // Método que actualiza un candidato en la base de datos
  actualizaCandidato(){
    this.dbs.updateDocument(this.candidato, "candidatos")
      .then(() => Swal.fire({
        title: "Actualizado",
        text: "El candidato se ha actualizado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops...",
        text: "El candidato no se ha actualizado",
        icon: "error"
      }));
  }

  // Método que crea un candidato en la base de datos
  creaCandidato(){
    this.dbs.newDocument(this.candidato, "candidatos")
      .then(() => Swal.fire({
        title: "Creado",
        text: "El candidato se ha creado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "El candidato no se ha creado",
        icon: "error"
      }));
  }
}
