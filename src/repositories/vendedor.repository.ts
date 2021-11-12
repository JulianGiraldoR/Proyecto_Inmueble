import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, UsuarioVendedor, Cliente, Ventas} from '../models';
import {UsuarioVendedorRepository} from './usuario-vendedor.repository';
import {ClienteRepository} from './cliente.repository';
import {VentasRepository} from './ventas.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly usuarioVendedor: HasOneRepositoryFactory<UsuarioVendedor, typeof Vendedor.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Vendedor.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuarioVendedorRepository') protected usuarioVendedorRepositoryGetter: Getter<UsuarioVendedorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Vendedor, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.usuarioVendedor = this.createHasOneRepositoryFactoryFor('usuarioVendedor', usuarioVendedorRepositoryGetter);
    this.registerInclusionResolver('usuarioVendedor', this.usuarioVendedor.inclusionResolver);
  }
}
