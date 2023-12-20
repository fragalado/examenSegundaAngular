import { Component } from '@angular/core';
import { Candidato } from 'src/app/modelos/candidato';
import { DatosEntrevista, Entrevista } from 'src/app/modelos/entrevista';
import { Puesto } from 'src/app/modelos/puesto';
import { DatabaseService } from 'src/app/servicios/database.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-lista-entrevistas',
  templateUrl: './lista-entrevistas.component.html',
  styleUrls: ['./lista-entrevistas.component.css']
})
export class ListaEntrevistasComponent {
  chart: any;
  candidatos?: Candidato[];
  puestos?: Puesto[];
  datosEntrevista?: DatosEntrevista[];
  entrevistas: Entrevista[] = [];
  constructor(private dbs: DatabaseService) { }

  ngOnInit(){
    this.obtieneEntrevistas();
  }

  // Método que obtiene todos los candidatos de la base de datos
  obtieneEntrevistas(){
    this.dbs.getCollection("entrevistas").subscribe(res => {
      this.datosEntrevista = res;

      // Ahora obtenemos todos los candidatos
      this.dbs.getCollection("candidatos").subscribe(res2 => {
        this.candidatos = res2;

        // Ahora obtenemos todos los puestos
        this.dbs.getCollection("puestos").subscribe(res3 => {
          this.puestos = res3;

          // Limpiamos la lista entrevistas
          this.entrevistas = [];

          // Ahora recorremos datosEntrevista y según el idCandidato y idPuesto obtenemos el candidato y puesto
          // Por ultimo creamos un objeto entrevista y lo añadimos a entrevistas
          this.datosEntrevista?.forEach(element => {
            const candidatoEncontrado = this.candidatos?.find(element2 => element2.id === element.idCandidato);
            const puestoEncontrado = this.puestos?.find(element3 => element3.id === element.idPuesto);
            // Creamos el objeto entrevista y lo añadimos a la lista
            const entrevistaCreada: Entrevista = {
              id: element.id,
              fechaEntrevista: element.fechaEntrevista,
              candidato: candidatoEncontrado!,
              puesto: puestoEncontrado!,
              realizada: element.realizada
            }

            this.entrevistas.push(entrevistaCreada);
          })
        })
      })
    });
  }

  // Método que elimina una entrevista en la base de datos
  eliminaEntrevista(id: string){
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
        this.dbs.deleteDocument(id, "entrevistas")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "La entrevista ha sido borrada",
            icon: "success"
          }));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La entrevista no ha sido borrada",
          icon: "error"
        });
      }
    });
  }

  // Muestra la grafica en la vista
  graficoPuestos(){
    // Cogemos todos los puestos y añadimos en un array todos los nombres de los puestos
    const arrayPuestos: string[] = [];
    this.puestos?.forEach(puesto => arrayPuestos.push(puesto.puesto));

    // Recorremos el arrayPuestos y contamos cada puesto en el array entrevistas
    // De esta maneras si encontramos dos puestos en el array de entrevistas con el mismo nombre quiere decir que hay dos candidatos
    const arrayData: string[] = [];
    arrayPuestos.forEach(element => {
      var contador = 0;
      this.entrevistas.forEach(element2 => {
        if(element == element2.puesto.puesto)
          contador++;
      });
      arrayData.push(contador.toString());
    });

    this.chart = new Chart("myChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: arrayPuestos, 
	       datasets: [
          {
            label: "Número de candidatos",
            data: arrayData,
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
