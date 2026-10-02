import { Actividad } from './actividad.interface';
export interface Itinerario{
  fechaCreacion: string;
  descripcion: string;
  actividades: Actividad[];
}
