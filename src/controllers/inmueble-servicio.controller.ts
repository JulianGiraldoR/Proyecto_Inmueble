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
  Servicio,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleServicioController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Servicio> {
    return this.inmuebleRepository.servicios(id);
  }
}
