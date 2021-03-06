import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicio,
  Inmueble,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioInmuebleController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.servicioRepository.inmuebles(id).find(filter);
  }

  @post('/servicios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.servicioRepository.inmuebles(id).create(inmueble);
  }

  @patch('/servicios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Servicio.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.servicioRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/servicios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Servicio.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.servicioRepository.inmuebles(id).delete(where);
  }
}
