import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Factura} from './factura.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  vendedorId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @belongsTo(() => Inmueble)
  inmuebleId: string;

  @hasOne(() => Factura)
  factura: Factura;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
