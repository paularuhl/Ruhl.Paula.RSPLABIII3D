import {
    cleanInfo, titulo,
    descripcion,
    precio,
    puertas,
    KM,
    potencia,
    radioTransaccion,
    selectedId,
    checkboxesColor, frmAutomovil
} from "../scripts.js";
import { bajaAnuncioFetch, modificarAnuncioFetch } from "../api/fetch.js";
import { traerSoloAnunciosFetchAsync } from "../api/fetch-async.js";

export const eventHandlerBajaFetch = async (e) => {
    e.preventDefault();
    try {

        const idSelected = selectedId.value;
        if (await bajaAnuncioFetch(idSelected)) {
            alert('Baja exitosa!');
            cleanInfo();

        }

    } catch (error) {

        throw { status: err.status, statusText: err.statusText };
    }
}
export const eventHandlerModificarFetch = async (e) => {
    e.preventDefault();
    try {
        const colores = [];
        frmAutomovil.color.forEach(color => {
            if (color.checked) {
                colores.push(color.value);
            }
        });
    
        let lista = await traerSoloAnunciosFetchAsync();
        const idSelected = parseInt(selectedId.value);
        const itemSeleccionado = lista.filter(x => x.id === idSelected);
        itemSeleccionado[0].titulo = titulo.value;
        itemSeleccionado[0].transaccion = radioTransaccion.value;
        itemSeleccionado[0].descripcion = descripcion.value;
        itemSeleccionado[0].precio = precio.value;
        itemSeleccionado[0].num_puertas = puertas.value;
        itemSeleccionado[0].num_KMs = KM.value;
        itemSeleccionado[0].potencia = potencia.value;
        itemSeleccionado[0].colores = colores;

        if (await modificarAnuncioFetch(idSelected, itemSeleccionado[0])) {
            alert('Modificacion OK');
            cleanInfo();

        }
    } catch (error) {

        alert(error);
        cleanInfo();
    }
}