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
  Ventas,
  Factura,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasFacturaController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/factura', {
    responses: {
      '200': {
        description: 'Ventas has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.ventasRepository.factura(id).get(filter);
  }

  @post('/ventas/{id}/factura', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInVentas',
            exclude: ['id'],
            optional: ['ventasId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.ventasRepository.factura(id).create(factura);
  }

  @patch('/ventas/{id}/factura', {
    responses: {
      '200': {
        description: 'Ventas.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.ventasRepository.factura(id).patch(factura, where);
  }

  @del('/ventas/{id}/factura', {
    responses: {
      '200': {
        description: 'Ventas.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.ventasRepository.factura(id).delete(where);
  }
}
