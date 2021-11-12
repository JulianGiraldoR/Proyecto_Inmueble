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
  Vendedor,
  Ventas,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorVentasController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Vendedor has many Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ventas>,
  ): Promise<Ventas[]> {
    return this.vendedorRepository.ventas(id).find(filter);
  }

  @post('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {
            title: 'NewVentasInVendedor',
            exclude: ['id'],
            optional: ['vendedorId']
          }),
        },
      },
    }) ventas: Omit<Ventas, 'id'>,
  ): Promise<Ventas> {
    return this.vendedorRepository.ventas(id).create(ventas);
  }

  @patch('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor.Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {partial: true}),
        },
      },
    })
    ventas: Partial<Ventas>,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.vendedorRepository.ventas(id).patch(ventas, where);
  }

  @del('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor.Ventas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.vendedorRepository.ventas(id).delete(where);
  }
}
