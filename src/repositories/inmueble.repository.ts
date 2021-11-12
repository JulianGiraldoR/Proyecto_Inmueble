import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Ciudad, Estado, Servicio, Tipo} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {EstadoRepository} from './estado.repository';
import {ServicioRepository} from './servicio.repository';
import {TipoRepository} from './tipo.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly ciudades: BelongsToAccessor<Ciudad, typeof Inmueble.prototype.id>;

  public readonly estados: BelongsToAccessor<Estado, typeof Inmueble.prototype.id>;

  public readonly servicios: BelongsToAccessor<Servicio, typeof Inmueble.prototype.id>;

  public readonly tipos: BelongsToAccessor<Tipo, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('TipoRepository') protected tipoRepositoryGetter: Getter<TipoRepository>,
  ) {
    super(Inmueble, dataSource);
    this.tipos = this.createBelongsToAccessorFor('tipos', tipoRepositoryGetter,);
    this.registerInclusionResolver('tipos', this.tipos.inclusionResolver);
    this.servicios = this.createBelongsToAccessorFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.estados = this.createBelongsToAccessorFor('estados', estadoRepositoryGetter,);
    this.registerInclusionResolver('estados', this.estados.inclusionResolver);
    this.ciudades = this.createBelongsToAccessorFor('ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
