import { Component } from '@angular/core';
import { Candidato } from 'src/app/modelos/candidato';
import { DatabaseService } from 'src/app/servicios/database.service';

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
    this.dbs.deleteDocument(id, "candidatos")
      .then()
      .catch();
  }
}
