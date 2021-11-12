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
  Estado,
  Inmueble,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoInmuebleController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Estado has many Inmueble',
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
    return this.estadoRepository.inmuebles(id).find(filter);
  }

  @post('/estados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInEstado',
            exclude: ['id'],
            optional: ['estadoId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.estadoRepository.inmuebles(id).create(inmueble);
  }

  @patch('/estados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Estado.Inmueble PATCH success count',
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
    return this.estadoRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/estados/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Estado.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.estadoRepository.inmuebles(id).delete(where);
  }
}
