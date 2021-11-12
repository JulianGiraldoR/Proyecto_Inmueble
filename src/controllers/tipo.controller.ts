import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tipo} from '../models';
import {TipoRepository} from '../repositories';

export class TipoController {
  constructor(
    @repository(TipoRepository)
    public tipoRepository : TipoRepository,
  ) {}

  @post('/tipos')
  @response(200, {
    description: 'Tipo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tipo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {
            title: 'NewTipo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipo: Omit<Tipo, 'id'>,
  ): Promise<Tipo> {
    return this.tipoRepository.create(tipo);
  }

  @get('/tipos/count')
  @response(200, {
    description: 'Tipo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tipo) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.count(where);
  }

  @get('/tipos')
  @response(200, {
    description: 'Array of Tipo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tipo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tipo) filter?: Filter<Tipo>,
  ): Promise<Tipo[]> {
    return this.tipoRepository.find(filter);
  }

  @patch('/tipos')
  @response(200, {
    description: 'Tipo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
    @param.where(Tipo) where?: Where<Tipo>,
  ): Promise<Count> {
    return this.tipoRepository.updateAll(tipo, where);
  }

  @get('/tipos/{id}')
  @response(200, {
    description: 'Tipo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tipo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tipo, {exclude: 'where'}) filter?: FilterExcludingWhere<Tipo>
  ): Promise<Tipo> {
    return this.tipoRepository.findById(id, filter);
  }

  @patch('/tipos/{id}')
  @response(204, {
    description: 'Tipo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tipo, {partial: true}),
        },
      },
    })
    tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.updateById(id, tipo);
  }

  @put('/tipos/{id}')
  @response(204, {
    description: 'Tipo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipo: Tipo,
  ): Promise<void> {
    await this.tipoRepository.replaceById(id, tipo);
  }

  @del('/tipos/{id}')
  @response(204, {
    description: 'Tipo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoRepository.deleteById(id);
  }
}
