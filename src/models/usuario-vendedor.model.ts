import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioVendedor extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
  })
  vendedorId?: string;

  constructor(data?: Partial<UsuarioVendedor>) {
    super(data);
  }
}

export interface UsuarioVendedorRelations {
  // describe navigational properties here
}

export type UsuarioVendedorWithRelations = UsuarioVendedor & UsuarioVendedorRelations;
