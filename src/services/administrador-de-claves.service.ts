import {injectable, /* inject, */ BindingScope} from '@loopback/core';
var geratePassword = require('password-generator')/**servicio para generar claves aleatorias */
var CryptoJS = require("crypto-js");/**servicio para encriptar contraseñas */

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorDeClavesService {
  constructor(/* Add @inject to inject parameters */) {}

  
  /**uso del servicio de password */
  GenerarClaveAleatoria(){
    let claveAleatoria = geratePassword ( 10, false)
    return claveAleatoria;
  }/**uso del servicio de encriptar contraseñas */
  CifrarTexto(texto:String){
    let textoCifrado = CryptoJS.MD5(texto).toString();
    return textoCifrado;
  }
  }