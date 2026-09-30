import { Actividad } from './actividad.interface';
export interface itinerario{
  fechaCreacion: string;
  descripcion: string;
  actividades: Actividad[];
}
