import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioVendedor} from './usuario-vendedor.model';
import {Cliente} from './cliente.model';
import {Ventas} from './ventas.model';

@model()
export class Vendedor extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  documento?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasOne(() => UsuarioVendedor)
  usuarioVendedor: UsuarioVendedor;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Ventas)
  ventas: Ventas[];

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
