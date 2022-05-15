
// objeto Serie
class Serie {
    constructor (id, nombre, temporadas, tempVistas) {
        this.id = id;
        this.nombre = nombre;
        this.temporadas = temporadas;
        this.tempVistas = tempVistas
    }
    // metodos
    getId() {return this.id}
    getNombre() {return this.nombre}
    getTemporadas() {return this.temporadas}
    getTempVistas() {return this.tempVistas}
    seVioUnaTemporada() { this.tempVistas++ }
    noSeVioUnaTemporada() { this.tempVistas-- }
    cambioDeNombre(nombreNuevo) {this.nombre = nombreNuevo}
    cambiarTemporadas(temporadasNueva) {this.temporadas = temporadasNueva}
    cambiarTempVistas(tempVistasNueva) {this.tempVistas = tempVistasNueva}
}

// Requerimiento 1 

// seleccionando la tabla de series
var tablaSeries = document.querySelector("#tabla-series");
// cortando los tag "tr" de la tabla de series
var listadoSeriesXtipo = tablaSeries.querySelectorAll("tr");
// elemento tr para agregar a modo de prueba
var elementoParaAgregar = "<tr> <td id='id'> id </td> <td id='nombre'>nombre </td> <td id='temporada'> temporada </td> <td id='tempVista'> temporadas vista </td> </tr>"
// agregar una las lista de series
var listadoSeries = []
const serie1 = new Serie(1,"Batman TAS", 3, 3);
const serie2 = new Serie(2,"Lost in space",3,2);
const serie3 = new Serie(3,"True Live",2,1);
const serie4 = new Serie(4,"Lost",7,5);
const serie5 = new Serie(5,"Walking Dead",10,7);
listadoSeries = [serie1,serie2,serie3,serie4,serie5]
// seleccion de fila: variable de estado para establecer si una fila de la tabla esta seleccionada o no
var hayFilaSeleccionada = false
// seleccion de fila: variable con el ID de la celda seleccionada
var idFilaSeleccionada = 0

var iconoDeSerie = "<img src="+"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlcERATEUhr+9K4ACKMBNGVwUwIkWONECJ+5uClCAmwIoYBWgAPNmEhOZ8LITmXHIHrMv3/fnZedtReanyswnRjAFDsDDC9MCxsD+W0hNIPAJcAXmjkTgG6BnBLtPEk0goC3QdSTCsvAbMAuc7uXTBFLoS2RNkqtwKXQFfWABdBIvvgbWwMUXHIF2ItxuF8nIF5zN20Gi5I3jtqgIbGdLi9RvrLToj1t0MpNTjRhRcAeGoWm6/MHAE/gqNE0jgjUvifnhNKc6O7ILngYVMRlp7J0IAAAAAElFTkSuQmCC"+"/>"

// funciones para la lista de series

function buscarSeriePorNombre(nombreSerie,listaDeSeries) { 
   return listaDeSeries.find(serie => serie.getNombre() == nombreSerie) // retorna el objete Serie
}

function buscarSeriePorId(idSerie,listaDeSeries) { 
    return listaDeSeries.find(serie => serie.getId() == idSerie); // retorna el objete Serie
}

function sumaUnaTemporadaVista(idSerie,listaDeSeries) {
    let serieVista = buscarSeriePorId(idSerie,listaDeSeries);
    serieVista.seVioUnaTemporada();
}

function restarUnaTemporadaVista(idSerie,listaDeSeries) {
    let serieVista = buscarSeriePorId(idSerie,listaDeSeries);
    serieVista.noSeVioUnaTemporada();
}

function cambiarNombreSerie(idSerie,nombreNuevo,listaDeSeries) {
    let serieACambiar = buscarSeriePorId(idSerie,listaDeSeries);
    serieACambiar.cambioDeNombre(nombreNuevo);
}

function cambiarTemporadasSerie(idSerie,cantidadTemporadasNueva,listaDeSeries) {
    let serieACambiar = buscarSeriePorId(idSerie,listaDeSeries);
    serieACambiar.cambiarTemporadas(cantidadTemporadasNueva);
}

function cambiarTempVistas(idSerie,cantidadTempVistas,listaDeSeries) {
    let serieACambiar = buscarSeriePorId(idSerie,listaDeSeries);
    serieACambiar.cambiarTempVistas(cantidadTempVistas);
}

function agregarSerieNueva(serie,listaDeSeries) {
    listaDeSeries.push(serie);
}


// funciones

function agregarFilaConUnaSerie(serie) {
    var fila = document.createElement("tr");  // crea un elemente "tr" y luego les agrega atributos
    fila.setAttribute("id","fila"+serie.getId())
    fila.setAttribute("onclick","seleccionarFila(id)");
    fila.appendChild(convertirAtributoColumna("id",serie.getId(),""))  // se agregan las columnas en formato child
    fila.appendChild(convertirAtributoColumna("id","nombre",serie.getNombre()))
    fila.appendChild(convertirAtributoColumna("id","temporada-lista",serie.getTemporadas()))
    fila.appendChild(convertirAtributoColumna("id","tempVistas-lista",serie.getTempVistas()))
    return fila
};


function convertirAtributoColumna(atributo,valorAtributo,textoColumna) {
    var columnaId = document.createElement("td"); // crea un elemento "td"
    columnaId.setAttribute(atributo,valorAtributo);  //se le agregan elementos por parametros
    var textoCelda = document.createTextNode(textoColumna); // Se le agrega elemento de texto
    columnaId.appendChild(textoCelda); // se vincula el elemento de texto como child
    return columnaId
};


function actualizarTablaSeries(listaDeSeries) {
    if (listaDeSeries.length > 0) {
        listaDeSeries.forEach(serie => agregarElementoALaTabla(addCallBack,serie));
        }
};


function agregarElementoALaTabla(callback,serieDeUnaLista) { 
    callback(tablaSeries,agregarFilaConUnaSerie(serieDeUnaLista)); 
};


function actualizarTrTablas(tabla) { 
    listadoSeriesXtipo = tabla.querySelectorAll("tr") };


function addCallBack(elementoDondeSeAgrega,elemento) { 
    // inserta una fila en la tabla cono child
    elementoDondeSeAgrega.appendChild(elemento);
    actualizarTrTablas(elementoDondeSeAgrega);
};


function eliminandoFilas(tabla,indice) { 
    tabla.deleteRow(indice);  // se quita la ultima fila de la tabla 
}

function limpiarTabla(tablaSeleccionada) {  // se utiliza: tablaSeries
    let cantidadFilas = tablaSeleccionada.rows.length;
    while (cantidadFilas > 1) {
        eliminandoFilas(tablaSeleccionada,cantidadFilas - 1);
        cantidadFilas--;
    }
}

function seleccionarFila(idFila) {
    var filaSeleccionada = document.getElementById(idFila)
    if (filaSeleccionada.className == "fila-seleccionada"){
        filaSeleccionada.classList.remove("fila-seleccionada");
        hayFilaSeleccionada = false
    }  else {
        let index = 0
        let serieEncontrada = false
        while (index < listadoSeriesXtipo.length - 1 && serieEncontrada == false) {  // mientras no se termine la lista a recorrer y la serie no se encuentre, segura ejecutando el ciclo
            index++
            if (listadoSeriesXtipo[index].className == "fila-seleccionada") {
                (listadoSeriesXtipo[index].classList.remove("fila-seleccionada"))
                serieEncontrada = true
            }
        }
        filaSeleccionada.classList.add("fila-seleccionada");
        hayFilaSeleccionada = true;
    }  
}


function restarTemporadasVistas() {
    if (hayFilaSeleccionada) {
        let indiceDeLaSerie = buscarFilaSeleccionada(listadoSeriesXtipo)
        let temporadasVistas = parseInt (listadoSeriesXtipo[indiceDeLaSerie].cells[3].innerText);
        if (temporadasVistas > 0) {  // si la fila esta seleccionada
            listadoSeriesXtipo[indiceDeLaSerie].cells[3].innerText --
            serieEncontrada = true
            let nombreSerie = listadoSeriesXtipo[indiceDeLaSerie].cells[1].innerText
            let serie = buscarSeriePorNombre(nombreSerie,listadoSeries)
            restarUnaTemporadaVista(serie.getId(),listadoSeries)
        }
        
    }
}

function sumarTemporadasVistas() {
    if (hayFilaSeleccionada) {
        // con el id de serie que esta en el tag tr nombre, se almacena ese id
        let indiceDeLaSerie = buscarFilaSeleccionada(listadoSeriesXtipo) // busca la fila seleccionada y trae el id de ese tag tr
        let temporadas = parseInt(listadoSeriesXtipo[indiceDeLaSerie].cells[2].innerText);
        let temporadasVistas = parseInt (listadoSeriesXtipo[indiceDeLaSerie].cells[3].innerText);
        if (temporadas > temporadasVistas) { 
            // se pasa el id de la fila tr de la fila seleccionada y se lo pasa por parametro
            listadoSeriesXtipo[indiceDeLaSerie].cells[3].innerText ++  // suma el contenido del campo temporada vista
            let nombreSerie = listadoSeriesXtipo[indiceDeLaSerie].cells[1].innerText
            let serie = buscarSeriePorNombre(nombreSerie,listadoSeries)
            sumaUnaTemporadaVista(serie.getId(),listadoSeries)
        }
    }
        
}

function buscarFilaSeleccionada(listadaSerieEnTr) {
    var idFilaEncontrada = 0
    if (hayFilaSeleccionada) {
        let index = 0
        let serieEncontrada = false
        while (index < listadaSerieEnTr.length - 1 && serieEncontrada == false) {  // mientras no se termine la lista a recorrer y la serie no se encuentre, segura ejecutando el ciclo
            index++
            if (listadaSerieEnTr[index].className == "fila-seleccionada") { // si la fila esta seleccionada
                idFilaEncontrada = index  // devuelve el indice de la lista donde esta la seria
                serieEncontrada = true
            }
        }
    }
    return idFilaEncontrada  // devuelve el id de la serie en la tabla tr y td
}

function buscarFilaYDeseleccionar() {
    if (hayFilaSeleccionada) {
        let indiceDeLaSerie = buscarFilaSeleccionada(listadoSeriesXtipo)
        listadoSeriesXtipo[indiceDeLaSerie].classList.remove("fila-seleccionada");
        hayFilaSeleccionada = false;
    }
}

function buscarSerie() {
    let serieBuscada = document.getElementById("input-buscar").value; // trae el valor del comboText con el ID pasado
    let index = 0
    let serieEncontrada = false
    buscarFilaYDeseleccionar()
    while (index < listadoSeriesXtipo.length - 1 && serieEncontrada == false) {  // mientras no se termine la lista a recorrer y la serie no se encuentre, segura ejecutando el ciclo
        index++
        serieEncontrada = listadoSeriesXtipo[index].cells[1].innerText.toUpperCase() == serieBuscada.toUpperCase() // compara la serie buscada y el tag tr de la lista.
    };
    if (serieEncontrada) {
        // Se selecciona la fila con la seria encontrada
        listadoSeriesXtipo[index].classList.add("fila-seleccionada");
        hayFilaSeleccionada = true;
    } else {
        console.log("La busqueda recorrio los " + index + " filas de la lista")
        alert("La serie NO esta en la lista","danger","buscar") //Alertas: success / danger / warning
    };
}



// Requerimiento 2

// modales: nueva series
var modalCrearSeries = document.getElementById('modal-crear-series')
var inputCrearSeries = document.getElementById('boton-crear')

modalCrearSeries.addEventListener('shown.bs.modal', function () {
    inputCrearSeries.focus()
})

function cargarUnaSerieNueva(nombreSerie,cantidadTemporadas,listaSeriesDondeCrear) {
    let id = listaSeriesDondeCrear.length + 1// verifica el tamaño de la lista, para saber el ultimo id
    let serieNueva = new Serie(id,nombreSerie, cantidadTemporadas, 0);
    agregarSerieNueva(serieNueva,listaSeriesDondeCrear) // agrega la serie en la lista de Series
    agregarElementoALaTabla(addCallBack,serieNueva)
}

function nuevaSerie() {
    const inputNombre = document.getElementById("nueva-serie-nombre");
    const nombreSerieNueva = inputNombre.value.toString();

    const inputTemporadas = document.getElementById("nueva-serie-temporadas");
    const temporadasSerieNueva = inputTemporadas.value;

    if (temporadasSerieNueva < 0 || temporadasSerieNueva == "") {
        alert("Los numeros de temporadas no pueden ser menores a 0","danger","nueva");
        inputTemporadas.value="";
    }else if (nombreSerieNueva == "" ) {
        alert("Te falto ingresar el nombre de la serie","danger","nueva");  // alertas: success / danger / warning
    } else {
    cargarUnaSerieNueva(nombreSerieNueva, temporadasSerieNueva,listadoSeries);
    alert("Diste de alta correctamente la serie. Podes cargar otra serie mas.","success","nueva"); // alertas success / danger / warning
    }
    inputNombre.value="";
    inputTemporadas.value="";
}

// modales: editar series
var modalEditarSeries = document.getElementById('modal-editar-series');
var inputEditarSeries = document.getElementById('boton-editar');

modalEditarSeries.addEventListener('shown.bs.modal', function () {
    inputEditarSeries.focus();
})

function vaciarCombosEditar() {
    let inputEditarNombre = document.getElementById("editar-nombre-serie");
    let inputEditarTemporadas = document.getElementById("editar-temporadas-serie");
    let inputEditarTempVistas = document.getElementById("editar-tempvistas-serie");
    inputEditarNombre.value = "" 
    inputEditarTemporadas.value = "" 
    inputEditarTempVistas.value = "" 
    desabilitarboton("#boton-modal-editar",false)
}

function desabilitarboton(idBoton,estadoBoleado) {  // idBoton es string y el id del tag, estadoBoleano es true/false
    const boton = document.querySelector(idBoton)
    boton.disabled = estadoBoleado
}

function abrirEditarSerie() {

    if (hayFilaSeleccionada == false) { 
        desabilitarboton("#boton-modal-editar",true)
        alert("elige una serie primero, antes de editarla","warning","editar") // alertas success / danger / warning
    } else {
    let inputEditarNombre = document.getElementById("editar-nombre-serie");
    let inputEditarTemporadas = document.getElementById("editar-temporadas-serie");
    let inputEditarTempVistas = document.getElementById("editar-tempvistas-serie");

    let indiceDeLaSerie = buscarFilaSeleccionada(listadoSeriesXtipo);
    
    inputEditarNombre.value = listadoSeriesXtipo[indiceDeLaSerie].cells[1].innerText;
    inputEditarTemporadas.value = listadoSeriesXtipo[indiceDeLaSerie].cells[2].innerText;
    inputEditarTempVistas.value = listadoSeriesXtipo[indiceDeLaSerie].cells[3].innerText;
    }
}

function editarSerie() {
    let inputEditarNombre = document.getElementById("editar-nombre-serie");
    let inputEditarTemporadas = document.getElementById("editar-temporadas-serie");
    let inputEditarTempVistas = document.getElementById("editar-tempvistas-serie");

    if (inputEditarNombre.value == "" || inputEditarTemporadas.value == "" || inputEditarTempVistas.value == "" ) { 
        alert("Para guardar la edicion, todos los datos deben estar ingresados","danger","editar"); // alertas success / danger / warning
    } else if (inputEditarTemporadas.value < 0  || inputEditarTempVistas.value < 0) {
        alert("Los numeros de temporadas no pueden ser menores a 0","danger","editar");  // alertas success / danger / warning
    } else {
        let nombreEditado = inputEditarNombre.value;
        let temporadasEditadas = parseInt(inputEditarTemporadas.value);
        let tempVistasEditadas = parseInt(inputEditarTempVistas.value);

        if (tempVistasEditadas <= temporadasEditadas) {

            let indiceEnlaTabla = buscarFilaSeleccionada(listadoSeriesXtipo);
            let SerieEnLaLista = buscarSeriePorId(indiceEnlaTabla,listadoSeries);

            // actualizacion de datos
            cambiarNombreSerie(SerieEnLaLista.getId(),nombreEditado,listadoSeries);
            cambiarTemporadasSerie(SerieEnLaLista.getId(),temporadasEditadas,listadoSeries);
            cambiarTempVistas(SerieEnLaLista.getId(),tempVistasEditadas,listadoSeries);

            listadoSeriesXtipo[indiceEnlaTabla].cells[1].innerText = nombreEditado;
            listadoSeriesXtipo[indiceEnlaTabla].cells[2].innerText = temporadasEditadas;
            listadoSeriesXtipo[indiceEnlaTabla].cells[3].innerText = tempVistasEditadas;

            alert("Actualizaste correctamente la serie","success","editar"); // alertas success / danger / warning
        } else {
            alert("No puede ser que las temporadas vistas sean mas de las que tiene la serie","danger","editar");  // alertas success / danger / warning
        }
    }
}

// alertas: personalizacion 
// tipos de Alertas: success / danger / warning

var alertList = document.querySelectorAll('.alert')
var alerts =  [].slice.call(alertList).map(function (element) {
  return new bootstrap.Alert(element)
})

var alertasSeriesNuevas = document.getElementById('alerta-nice-series-nuevas')
var alertasSeriesEditadas = document.getElementById('alerta-nice-series-editadas')
var alertasSeriesBusqueda = document.getElementById('alerta-nice-series-busqueda')

function alert(mensaje,tipoAlerta,seccion) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div id="alerta-series" class="alert alert-' + tipoAlerta + ' alert-dismissible" role="alert">' + mensaje + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    if (seccion == "nueva") {
        alertasSeriesNuevas.append(wrapper)
    } else if (seccion == "editar") {
        alertasSeriesEditadas.append(wrapper)
    } else if (seccion == "buscar") {
        alertasSeriesBusqueda.append(wrapper);
    }
}

// Ejecucion 

actualizarTablaSeries(listadoSeries)
