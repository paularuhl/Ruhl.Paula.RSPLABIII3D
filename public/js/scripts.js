import crearTabla from "../js/tabla.js";

import { traerSoloAnunciosFetchAsync, traerAnuncios } from "../js/api/fetch-async.js";
import { eventHandlerAltaFetchAsync } from "../js/controllers/controllerCrudFetchAsync.js";

import { eventHandlerBajaFetch, eventHandlerModificarFetch } from "../js/controllers/controllerCrudFetch.js";

let listaAutomoviles = [];

export const frmAutomovil = document.forms[0];


const btnGuardar = document.getElementById("btnGuardar");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnRefresh = document.getElementById("btnRefresh");

export const titulo = document.getElementById("txtTitulo");
export const descripcion = document.getElementById("txtDescripcion");
export const precio = document.getElementById("txtPrecio");
export const puertas = document.getElementById("txtPuertas");
export const KM = document.getElementById("txtKMs");
export const potencia = document.getElementById("txtPotencia");
export const radioTransaccion = frmAutomovil.transaction;
export const selectedId = document.getElementById("txtID");
export const divTabla = document.getElementById('divTabla');
export const divSpinner = document.getElementById('divSpinner');
export const precioPromedio = document.getElementById('txtPrecioPromedio');
export const precioMaximo = document.getElementById('txtPrecioMaximo');
export const precioMinimo = document.getElementById('txtPrecioMinimo');
export const promedioPotencia = document.getElementById('txtPromedioPotencia');

export const btnFiltroTodos = document.getElementById('btnFiltroTodos');
export const btnFiltroAlquiler = document.getElementById('btnFiltroAlquiler');
export const btnFiltroVenta = document.getElementById('btnFiltroVenta');

export const selectFiltro = document.getElementById('filterTransaction');


export const checkboxesColor = frmAutomovil.color;
export const everyCheckbox = document.querySelectorAll('.cbox');

window.addEventListener('load', initHandlers);
const sinFiltro = "N/A";

async function initHandlers() {

    try {
        listaAutomoviles = await traerAnuncios();

        filtrar(listaAutomoviles, sinFiltro);

        btnGuardar.addEventListener('change', async (e) => {
            try {
                await eventHandlerAltaFetchAsync(e);
            }
            catch (error) {
                alert(error);
                cleanInfo();
            }

        });        

        btnEliminar.addEventListener('click', async (e) => {

            try { await eventHandlerBajaFetch(e); }
            catch (error) { alert(error); cleanInfo(); }

        });


        btnModificar.addEventListener('click', async (e) => {

            try { await eventHandlerModificarFetch(e); }
            catch (error) { alert(error); cleanInfo(); }

        });

        selectFiltro.addEventListener('change', async (e) => {
            e.preventDefault();
            listaAutomoviles = filtrar(await traerSoloAnunciosFetchAsync(), selectFiltro[selectFiltro.selectedIndex].value);


            divTabla.textContent = '';
            divTabla.appendChild(crearTabla(listaAutomoviles));

        });

        everyCheckbox.forEach(el => { mapearTabla(el, listaAutomoviles); });

        const columnas = JSON.parse(localStorage.getItem('columnas')) || null;


        // if (columnas) {
        //    //
        // } else {
        // }

    } catch (err) {
        console.log(err)

        err.status && err.statusText
            ? console.error(`Estado de la petición: ${err.status} - ${err.statusText}`)
            : console.error('Error!');
    }

};



export const cleanInfo = function () {

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtKMs").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtID").value = "";
    frmAutomovil.color.forEach(color => {
        color.checked = false
    });

    btnGuardar.disabled = false;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;
}

function filtrar(lista, filtro){
    const filtrada = filtro === sinFiltro ? lista : lista.filter(x => x.transaccion === filtro);
    const precios = filtrada.map(x => x.precio);
    const resultado = precios.reduce((acc, el) => acc + el, 0) / precios.length;

    precioPromedio.value = Math.round(resultado);

    precios.sort((a, b) => {
        return a - b;
      });


      console.log(precios);
      precioMaximo.value = precios[precios.length - 1];
      precioMinimo.value = precios[0];
      promediarPotencia(filtrada)
    return filtrada;

}

function promediarPotencia(lista){

    const potencias = lista.map(x => x.potencia);
    const resultado = potencias.reduce((acc, el) => acc + el, 0) / potencias.length;

    promedioPotencia.value = Math.round(resultado);
}


async function mapearTabla(element, lista) {

    element.addEventListener('click', async () => {

        lista = await traerSoloAnunciosFetchAsync();

        const keys = [];
        let flagKeys = false;
        let listaMapeada = lista.map(row => {

            let fila = {};
            for (const key in row) {
                if (document.getElementById('cbox' + key).checked) {
                    fila[key] = row[key];
                    if(!flagKeys)
                    keys.push(key);
                }
            }
            flagKeys = true;
            return fila;
        })

        divTabla.textContent = '';
        divTabla.appendChild(crearTabla(listaMapeada));
        localStorage.setItem("columnas", JSON.stringify(keys));

    });

};

export const crearAnuncio = () => {


    let camposCompletos = document.forms[0].checkValidity();

    const colores = [];
    checkboxesColor.forEach(color => {
        if (color.checked) {
            colores.push(color.value);
        }
    });
    camposCompletos = camposCompletos && colores.length > 0;
    e.preventDefault();

    const nuevoAnuncio = new Anuncio_Auto(0,
        titulo.value,
        radioTransaccion.value,
        descripcion.value,
        precio.value,
        puertas.value,
        KM.value,
        potencia.value,
        colores
    );

    if (camposCompletos) {
        return nuevoAnuncio;
    }
    else {
        let msg = "";
        if (colores.length === 0) {
            msg = "Debe seleccionar al menos un color... ";
        }
        throw new Error(msg + "Los campos no están completos, o alguno está incorrecto. No se guardó.");
    }

}
