import { Destino } from "./destino.interface";
import { Gasto } from "./gasto.interface";
import { Presupuesto } from "./presupuesto.interface";



export interface Viaje{
  id: number;
  fechaInicio: string;
  fechaFinalizacion: string;
  estado: string;
  transporte: string;
  destino: Destino;
  presupuesto: Presupuesto;
  gastos: Gasto[];
  itinerario: Itinerario;
  listaNecesidades: ListaNecesidades;
}
