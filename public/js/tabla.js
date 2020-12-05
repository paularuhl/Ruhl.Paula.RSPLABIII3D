

export default function crearTabla(lista) {
    
    const tabla = document.createElement('table');

    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}


function crearCabecera(item) {
    const cabecera = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        const texto = document.createTextNode(key)
        th.appendChild(texto);
        tr.appendChild(th);
    }
    cabecera.appendChild(tr);
    return cabecera;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
        const tr = document.createElement('tr');

        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key])
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id'])

        }
        agregarManejadorTR(tr, lista);
        tbody.appendChild(tr);
    });

    return tbody;
}


function agregarManejadorTR(tr, lista) {
    if (tr) {
        tr.addEventListener('click', function (e) {

            const id = e.target.parentElement.getAttribute('data-id');

            const titulo = document.getElementById("txtTitulo");
            const descripcion = document.getElementById("txtDescripcion");
            const precio = document.getElementById("txtPrecio");
            const puertas = document.getElementById("txtPuertas");
            const km = document.getElementById("txtKMs");
            const potencia = document.getElementById("txtPotencia");

            const btnGuardar = document.getElementById("btnGuardar");
            const btnModificar = document.getElementById("btnModificar");
            const btnEliminar = document.getElementById("btnEliminar");

            document.getElementById("txtID").value = id;

            lista.forEach(element => {
                if (id == element.id) {

                    titulo.value = element.titulo;
                    descripcion.value = element.descripcion;
                    precio.value = element.precio;
                    puertas.value = element.num_puertas;
                    km.value = element.num_KMs;
                    potencia.value = element.potencia;

                    if (element.transaccion == "venta") {
                        document.getElementById("rdoS").checked = true;
                    } else {
                        document.getElementById("rdoR").checked = true;
                    }

                    const frmAutomovil = document.forms[0];

                    if (element.colores) {
                        element.colores.forEach(color => {
                            frmAutomovil.color.forEach(cboxColor => {
                                //solo tilda si coincide
                                if (color === cboxColor.value) cboxColor.checked = true;
                            });

                        });
                    }

                }
            });

            btnGuardar.disabled = true;
            btnModificar.disabled = false;
            btnEliminar.disabled = false;


        });

    }
}