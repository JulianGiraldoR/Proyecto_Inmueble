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
  Estado,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleEstadoController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Estado> {
    return this.inmuebleRepository.estados(id);
  }
}
