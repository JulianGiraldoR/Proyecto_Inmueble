import { service } from '@loopback/core';
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
import {Credenciales, CredencialesCambioClave, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AdministradorDeClavesService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AdministradorDeClavesService)
    public servicioClaves: AdministradorDeClavesService,
  ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    /**codigo para generar clave aleatoria */
    let clave = this.servicioClaves.GenerarClaveAleatoria();
    console.log(clave);
    let claveCifrada = this.servicioClaves.CifrarTexto(clave);
    console.log(claveCifrada);
    usuario.clave = claveCifrada;
    return this.usuarioRepository.create(usuario);
    
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

   /**
   *
   *                            Seccion Seguridad
   *
   */

  @post("/idetificar-usuario",{
    responses:{
      '200':{
        descripion:"identificacion de usuario"
      }
    }
  })
  async identificar(
    @requestBody() credeciales:Credenciales
  ): Promise<Usuario | null>{
    let usuario = await this.usuarioRepository.findOne({
      where:{
        correo:credeciales.usuario,
        clave:credeciales.clave
      }
  
    });
    if(usuario){
      usuario.clave = "";
  
  
    }
    return usuario;
  }
  /**
   *
   *                            Recuperar contraseña
   *
   */

  
@post("/recuperar-clave",{
  responses:{
    '200':{
      descripion:"Recuperacion de clave de usuarios"
    }
  }
})
async recuperarClave(
  @requestBody() correo: string
): Promise<Boolean>{
  let usuario = await this.usuarioRepository.findOne({
    where:{
      correo:correo,

    }

  });
  if(usuario){
    let clave = this.servicioClaves.GenerarClaveAleatoria();
    console.log(clave);
    let claveCifrada = this.servicioClaves.CifrarTexto(clave);
    console.log(claveCifrada);
    usuario.clave = claveCifrada;
    await this.usuarioRepository.updateById(usuario.id, usuario);
    return true
    // enviar clave por correo electronico

  }
  return false;
}

 /**
   *
   *                            cambiar clave
   *
   */

@post("/cambiar-clave",{
  responses:{
    '200':{
      descripion:"Cambio de clave de usuarios"
    }
  }
})
async cambiarClave(
  @requestBody() datos: CredencialesCambioClave
): Promise<Boolean>{
  let usuario = await this.usuarioRepository.findById(datos.id);

  if(usuario){
      if(usuario.clave == datos.clave_actual){
        usuario.clave = datos.nueva_clave;
        console.log(datos.nueva_clave);
        await this.usuarioRepository.updateById(datos.id, usuario);
        // enviar email notificando cambio de contraseña

        return true;
      }else{
        return false;
      }

  }
  return false;
}
 

}


