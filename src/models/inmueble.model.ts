import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Estado} from './estado.model';
import {Servicio} from './servicio.model';
import {Tipo} from './tipo.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  habitaciones: number;

  @property({
    type: 'number',
    required: true,
  })
  banos: number;

  @property({
    type: 'string',
    required: true,
  })
  estrato: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;
  @belongsTo(() => Ciudad, {name: 'ciudades'})
  ciudadId: string;

  @belongsTo(() => Estado, {name: 'estados'})
  estadoId: string;

  @belongsTo(() => Servicio, {name: 'servicios'})
  servicioId: string;

  @belongsTo(() => Tipo, {name: 'tipos'})
  tipoId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
