import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Tipo, TipoRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Tipo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Tipo, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
