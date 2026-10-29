import { Destino } from "./destino.interface";
import { Gasto } from "./gasto.interface";
import { Itinerario } from "./itinerario.interface";
import { ListaNecesidades } from "./listaNecesidades.interface";
import { Presupuesto } from "./presupuesto.interface";

export type estadoViaje = 'activo' | 'cancelado' | 'finalizado';

export interface Viaje{
  name:string;
  id: number;
  fechaInicio: string;
  fechaFinalizacion: string;
  estado: estadoViaje;
  transporte: string;
  destino: Destino;
  usuarioId:number;

  presupuesto?: Presupuesto;
  gastos?: Gasto[];
  itinerario?: Itinerario;
  listaNecesidades?: ListaNecesidades;

}
