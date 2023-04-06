let cursos = [];

let seleccionados = [];
const maxCreditos = 21;
const minCreditos = 12;


function crearElemento(tag, clase, contenido) {
    const elemento = document.createElement(tag);
    if (clase) {
        elemento.classList.add(clase);
    }
    if (contenido) {
        elemento.innerHTML = contenido;
    }
    return elemento;
}


function actualizarSeleccionados() {
    const listaSeleccionados = document.getElementById('lista-seleccionados');
    listaSeleccionados.innerHTML = '';
    let totalCreditos = 0;
    const cursosAlmacenados = JSON.parse(localStorage.getItem('cursos')); 
    seleccionados.forEach(curso => {
        const cursoCompleto = cursosAlmacenados.find(c => c.nombre === curso.nombre);
        const item = crearElemento('li', null, cursoCompleto.nombre + ' (' + cursoCompleto.creditos + ' créditos)');
        listaSeleccionados.appendChild(item);
        totalCreditos += cursoCompleto.creditos;
    });
    const textoCreditos = 'Total de créditos seleccionados: ' + totalCreditos;
    const creditosSeleccionados = document.getElementById('creditos-seleccionados');
    creditosSeleccionados.innerHTML = textoCreditos;
}


function agregarCurso(curso) {
    if (seleccionados.length >= maxCreditos / 2) {
        alert('No se pueden seleccionar más cursos');
        return;
    }
    if (seleccionados.includes(curso)) {
        alert('Este curso ya ha sido seleccionado');
        return;
    }
    if (seleccionados.reduce((suma, curso) => suma + curso.creditos, 0) + curso.creditos > maxCreditos) {
        alert('La selección de cursos excede el límite de créditos');
        return;
    }
    seleccionados.push(curso);
    actualizarSeleccionados();
    const cajaCurso = document.getElementById(curso.nombre);
    cajaCurso.classList.add('seleccionado');
}


function quitarCurso(curso) {
    seleccionados = seleccionados.filter(c => c !== curso);
    actualizarSeleccionados();
    const cajaCurso = document.getElementById(curso.nombre);
    cajaCurso.classList.remove('seleccionado');
}


function cargarCursos() {
    const cursosDiv = document.getElementById('cursos');
    cursos.forEach(curso => {
        const cajaCurso = crearElemento('div', 'curso', curso.nombre + ' (' + curso.creditos + ' créditos)');
        cajaCurso.id = curso.nombre;
        cajaCurso.addEventListener('click', () => {
            if (seleccionados.includes(curso)) {
                quitarCurso(curso);
            } else {
                agregarCurso(curso);
            }
        });
        cursosDiv.appendChild(cajaCurso);
    });
}


function reiniciarSeleccion() {
    seleccionados = [];
    actualizarSeleccionados();
    document.querySelectorAll('.curso').forEach(cajaCurso => {
        cajaCurso.classList.remove('seleccionado');
    });
}


function confirmarSeleccion() {
    if (seleccionados.reduce((suma, curso) => suma + curso.creditos, 0) < minCreditos) {
        alert('Debe seleccionar al menos ' + minCreditos + ' créditos');
        return;
    }
    const popup = crearElemento('div', 'popup');
    const contenidoPopup = crearElemento('div', 'contenido-popup');
    const tituloPopup = crearElemento('h2', null, 'Cursos seleccionados:');
    contenidoPopup.appendChild(tituloPopup);
    if (seleccionados.length > 5) {
        const nota = crearElemento('p', null, 'Recuerda que el número máximo de cursos seleccionados es 5');
        contenidoPopup.appendChild(nota);
    }
    const listaPopup = crearElemento('ul', null, null);
    seleccionados.forEach(curso => {
        const item = crearElemento('li', null, curso.nombre + ' (' + curso.creditos + ' créditos)');
        listaPopup.appendChild(item);
    });
    contenidoPopup.appendChild(listaPopup);
    popup.appendChild(contenidoPopup);
    document.body.appendChild(popup);
    popup.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
    reiniciarSeleccion();
}

function cargarCursos() {
    const cursosDiv = document.getElementById('cursos');
    const cursosAlmacenados = JSON.parse(localStorage.getItem('cursos')); 
    cursosAlmacenados.forEach(curso => {
        const cajaCurso = crearElemento('div', 'curso', curso.nombre + ' (' + curso.creditos + ' créditos)');
        cajaCurso.id = curso.nombre;
        cajaCurso.addEventListener('click', () => {
            if (seleccionados.includes(curso)) {
                quitarCurso(curso);
            } else {
                agregarCurso(curso);
            }
        });
        cursosDiv.appendChild(cajaCurso);
    });
}

function main() {
    cargarCursos();
    actualizarSeleccionados();
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    confirmarSeleccionBtn.addEventListener('click', confirmarSeleccion);
    const cancelarSeleccionBtn = document.getElementById('cancelar-seleccion');
    cancelarSeleccionBtn.addEventListener('click', reiniciarSeleccion);
}

document.addEventListener('DOMContentLoaded', main);
