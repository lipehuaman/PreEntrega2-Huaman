let seleccionados = [];
const maxCreditos = 21;
const minCreditos = 12;
let cursos = [];

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
    seleccionados.forEach(curso => {
        const item = crearElemento('li', null, curso.nombre + ' (' + curso.creditos + ' créditos)');
        listaSeleccionados.appendChild(item);
        totalCreditos += curso.creditos;
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
}

function quitarCurso(curso) {
    seleccionados = seleccionados.filter(c => c !== curso);
    actualizarSeleccionados();
}

function cargarCursos() {
    const cursosDiv = document.getElementById('cursos');
    cursos.forEach(curso => {
        const cajaCurso = crearElemento('div', 'curso', curso.nombre + ' (' + curso.creditos + ' créditos)');
        cajaCurso.addEventListener('click', () => {
            if (seleccionados.includes(curso)) {
                quitarCurso(curso);
                cajaCurso.classList.remove('seleccionado');
            } else {
                agregarCurso(curso);
                cajaCurso.classList.add('seleccionado');
            }
        });
        cursosDiv.appendChild(cajaCurso);
    });
}

function main() {
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    confirmarSeleccionBtn.addEventListener('click', () => {
        if (seleccionados.length < minCreditos) {
            alert('Debe seleccionar al menos ' + minCreditos + ' créditos');
        } else {
            const popup = document.createElement('div');
            const contenidoPopup = document.createElement('div');
            const tituloPopup = document.createElement('h2');
            tituloPopup.textContent = 'Cursos seleccionados:';
            contenidoPopup.appendChild(tituloPopup);
            if (seleccionados.length > 5) {
                const nota = document.createElement('p');
                nota.textContent = 'Recuerda que el número máximo de cursos seleccionados es 5';
                contenidoPopup.appendChild(nota);
            }
            const listaPopup = document.createElement('ul');
            seleccionados.forEach(curso => {
                const item = document.createElement('li');
                item.textContent = curso.nombre + ' (' + curso.creditos + ' créditos)';
                listaPopup.appendChild(item);
            });
            contenidoPopup.appendChild(listaPopup);
            popup.appendChild(contenidoPopup);
            document
                .body.appendChild(popup);
            popup.addEventListener('click', () => {
                document.body.removeChild(popup);
            });
            reiniciarSeleccion();
        }
    });
    const cancelarSeleccionBtn = document.getElementById('cancelar-seleccion');
    cancelarSeleccionBtn.addEventListener('click', reiniciarSeleccion);

    // Cargar los cursos desde el archivo JSON utilizando Fetch
    fetch('cursos.json')
        .then(response => response.json())
        .then(data => {
            cursos = data;
            cargarCursos();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

function reiniciarSeleccion() {
    seleccionados = [];
    actualizarSeleccionados();
    const cursosDiv = document.getElementById('cursos');
    cursosDiv.querySelectorAll('.curso').forEach(cajaCurso => {
        cajaCurso.classList.remove('seleccionado');
    });
}

document.addEventListener('DOMContentLoaded', main);
