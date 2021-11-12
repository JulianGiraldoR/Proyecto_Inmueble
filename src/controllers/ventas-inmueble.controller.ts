import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventas,
  Inmueble,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasInmuebleController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.string('id') id: typeof Ventas.prototype.id,
  ): Promise<Inmueble> {
    return this.ventasRepository.inmueble(id);
  }
}
