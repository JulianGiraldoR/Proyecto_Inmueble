import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor, Ventas} from '../models';
import {VendedorRepository} from './vendedor.repository';
import {VentasRepository} from './ventas.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly vendedor: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Cliente, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.vendedor = this.createBelongsToAccessorFor('vendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('vendedor', this.vendedor.inclusionResolver);
  }
}
