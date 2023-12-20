import { Component } from '@angular/core';
import { Candidato } from 'src/app/modelos/candidato';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-candidatos',
  templateUrl: './lista-candidatos.component.html',
  styleUrls: ['./lista-candidatos.component.css']
})
export class ListaCandidatosComponent {

  candidatos?: Candidato[];
  constructor(private dbs: DatabaseService) { }

  ngOnInit(){
    this.obtieneCandidatos();
  }

  // Método que obtiene todos los candidatos de la base de datos
  obtieneCandidatos(){
    this.dbs.getCollection("candidatos").subscribe(res => this.candidatos = res);
  }

  // Método que elimina un candidato en la base de datos
  eliminaCandidato(id: string){
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
        this.dbs.deleteDocument(id, "candidatos")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "El candidato ha sido borrado",
            icon: "success"
          }));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El candidato no ha sido borrado",
          icon: "error"
        });
      }
    });
  }
}
