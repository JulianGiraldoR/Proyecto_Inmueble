import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Tipo,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTipoController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipo', {
    responses: {
      '200': {
        description: 'Tipo belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tipo)},
          },
        },
      },
    },
  })
  async getTipo(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Tipo> {
    return this.inmuebleRepository.tipos(id);
  }
}
