import { crearAnuncio, cleanInfo } from "../scripts.js";

import { altaAnuncioFetchAsync } from "../api/fetch-async.js";

export const divSpinner = document.querySelector('#divSpinner');

export const eventHandlerAltaFetchAsync = async (e) => {

    e.preventDefault();
    try {

        const anuncioForm = crearAnuncio();

        if (anuncioForm) {

            if (await altaAnuncioFetchAsync(anuncioForm)) {
                alert('Alta OK');
                cleanInfo();
            }
        }
    } catch (err) {

        throw { status: err.status, statusText: err.statusText };
    }

}