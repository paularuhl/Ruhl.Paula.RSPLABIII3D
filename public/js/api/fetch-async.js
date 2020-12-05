import Anuncio_Auto from "../anuncio_auto.js";
import { divSpinner } from "../controllers/controllerCRUDFetchAsync.js";
import crearTabla from "../tabla.js";
import { divTabla } from "../scripts.js";

const BASE_URL = 'http://localhost:3000/anuncios';

export const traerSoloAnunciosFetchAsync = async () => {
    try {
        divSpinner.textContent = '';
        divSpinner.appendChild(crearPreloader());
        const res = await fetch(BASE_URL);


        const data = await res.json();

        if (!res.ok) {
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }
        const parsed = [];
        data.forEach(element => {
            parsed.push(new Anuncio_Auto(element.id,
                element.titulo,
                element.transaccion,
                element.descripcion,
                element.precio,
                element.num_puertas,
                element.num_KMs,
                element.potencia,
                element.colores
            ));
        });
        divSpinner.textContent = '';
        return parsed;

    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export const traerAnuncios = async () => {
    try {

            const data = await traerSoloAnunciosFetchAsync();
            let parsed = [];

            data.forEach(element => {
                parsed.push(new Anuncio_Auto(element.id,
                    element.titulo,
                    element.transaccion,
                    element.descripcion,
                    element.precio,
                    element.num_puertas,
                    element.num_KMs,
                    element.potencia,
                    element.colores
                ));
            });
            divTabla.textContent = '';
            divTabla.appendChild(crearTabla(parsed));

            return parsed;
        } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export const altaAnuncioFetchAsync = async (anuncio) => {
    try {
        divSpinner.appendChild(crearPreloader());
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(anuncio)
        }
        const res = await fetch(BASE_URL, options);
        if (!res.ok) {
            let msgError = res.statusText || 'Se produjo un error al crear el anuncio :(';
            throw { status: res.status, statusText: msgError };
        }


        traerAnuncios();
        return true;
    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

const crearPreloader = () => {
    const loaderBarSpinner = document.createElement('img');
    loaderBarSpinner.width = 80;
    loaderBarSpinner.src = './img/739.gif';
    loaderBarSpinner.alt = 'Barra ~spinner~ para la carga de la tabla.';
    return loaderBarSpinner;
}