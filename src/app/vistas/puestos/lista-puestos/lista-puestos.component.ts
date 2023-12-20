import { Component } from '@angular/core';
import { Puesto } from 'src/app/modelos/puesto';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-puestos',
  templateUrl: './lista-puestos.component.html',
  styleUrls: ['./lista-puestos.component.css']
})
export class ListaPuestosComponent {

  puestos?: Puesto[];

  constructor(private dbs: DatabaseService) { }

  ngOnInit(){
    this.obtienePuestos();
  }

  // Método que obtiene todos los puestos de la base de datos
  obtienePuestos(){
    this.dbs.getCollection("puestos").subscribe(res => this.puestos = res);
  }

  // Método que elimina un puesto en la base de datos
  eliminaPuesto(id: string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-danger me-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbs.deleteDocument(id, "puestos")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "El puesto ha sido borrado",
            icon: "success"
          }));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El puesto no ha sido borrado",
          icon: "error"
        });
      }
    });
  }
}
