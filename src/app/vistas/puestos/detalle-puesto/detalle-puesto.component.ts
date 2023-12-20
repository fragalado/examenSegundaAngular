import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Puesto } from 'src/app/modelos/puesto';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-puesto',
  templateUrl: './detalle-puesto.component.html',
  styleUrls: ['./detalle-puesto.component.css']
})
export class DetallePuestoComponent {

  id?: any;
  puesto: Puesto = {puesto: "", empresa: "", disponible: true};
  formPuesto = this.formBuilder.group({
    puesto: [this.puesto.puesto, Validators.required],
    disponible: [this.puesto.disponible, Validators.required],
    empresa: [this.puesto.empresa, Validators.required]
  });
  
  constructor(private formBuilder: FormBuilder, private dbs: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    if(this.route.snapshot.paramMap.get("id") != null){
      this.id = this.route.snapshot.paramMap.get("id");

      // Si tenemos id buscamos el puesto en la base de datos
      this.dbs.getDocumentById(this.id, "puestos").subscribe(res => {
        this.puesto = res

        // Actualizamos los datos del formulario
        this.formPuesto.patchValue({
          puesto: this.puesto.puesto,
          disponible: this.puesto.disponible,
          empresa: this.puesto.empresa
        })
      });
    }
  }

  // Método que se activará cuando se le de al botón de enviar
  // Comprueba si hay id o no
  // Si hay id llama a actualiza y si no hay llama a crea
  enviar(){
    // Actualizamos el puesto con los datos del formulario
    this.puesto.puesto = this.formPuesto.controls["puesto"].value!;
    this.puesto.disponible = this.formPuesto.controls["disponible"].value!;
    this.puesto.empresa = this.formPuesto.controls["empresa"].value!;

    if(this.id)
      this.actualizaPuesto();
    else 
      this.creaPuesto();

    // Mandamos a la vista listado
    this.router.navigateByUrl("/puestos/listado");
  }

  // Método que actualiza un puesto en la base de datos
  actualizaPuesto(){
    this.dbs.updateDocument(this.puesto, "puestos")
      .then(() => Swal.fire({
        title: "Actualizado",
        text: "El puesto se ha actualizado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops...",
        text: "El puesto no se ha actualizado",
        icon: "error"
      }));
  }

  // Método que crea un puesto en la base de datos
  creaPuesto(){
    this.dbs.newDocument(this.puesto, "puestos")
      .then(() => Swal.fire({
        title: "Creado",
        text: "El puesto se ha creado",
        icon: "success"
      }))
      .catch(() => Swal.fire({
        title: "Oops..",
        text: "El puesto no se ha creado",
        icon: "error"
      }));
  }
}
