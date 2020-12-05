import Anuncio from "../js/anuncio.js";

export default class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia, colores){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_KMs = num_KMs;
        this.num_puertas = num_puertas;
        this.potencia = potencia;
        this.colores = colores;
    }
}

