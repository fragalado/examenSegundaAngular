import { Candidato } from "./candidato";
import { Puesto } from "./puesto";

export interface Entrevista {
    id?: string,
    fechaEntrevista: string,
    candidato: Candidato,
    puesto: Puesto,
    realizada: boolean
}

export interface DatosEntrevista{
    id?: string,
    fechaEntrevista: string,
    idCandidato: string,
    idPuesto: string,
    realizada: boolean
}
