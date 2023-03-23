const alumnos = [];

while (true) {
    const nombre = prompt("Ingrese el nombre del alumno:");

    const notas = {
        ejercicio1: Number(prompt("Ingrese la nota del Ejercicio 1 (Entre 0 y 10)")),
        ejercicio2: Number(prompt("Ingrese la nota del Ejercicio 2 (Entre 0 y 10)")),
        parcial: Number(prompt("Ingrese la nota del Parcial (Entre 0 y 10)")),
        examenFinal: Number(prompt("Ingrese la nota del Examen Final (Entre 0 y 10)")),
    };

    // Validar que las notas estén entre 1 y 10
    const notasValidas = Object.values(notas).every(nota => nota >= 1 && nota <= 10);

    if (!notasValidas) {
        alert("Error: las notas deben estar entre 1 y 10.");
        continue;
    }

    for (const nota in notas) {
        if (notas[nota] > 10) {
            alert(`Error: la nota de ${nota} debe ser menor o igual a 10.`);
            continue;
        }
    }

    const notaFinal = calcularNotaFinal(notas);

    const alumno = {
        nombre,
        notas,
        notaFinal,
    };

    const mensaje = `${alumno.nombre} tiene una nota final de ${alumno.notaFinal.toFixed(2)}.`;

    if (alumno.notaFinal >= 4) {
        alert(`Aprobado! ${mensaje}`);
    } else {
        alert(`Desaprobado. ${mensaje}`);
    }

    alumnos.push(alumno);

    const seguir = prompt("¿Desea agregar otro alumno?").toUpperCase();

    if (seguir === "N") {
        break;
    }
}

function calcularNotaFinal(notas) {
    const notaEjercicio1 = notas.ejercicio1 * 0.15;
    const notaEjercicio2 = notas.ejercicio2 * 0.15;
    const notaParcial = notas.parcial * 0.3;
    const notaExamenFinal = notas.examenFinal * 0.4;
    return notaEjercicio1 + notaEjercicio2 + notaParcial + notaExamenFinal;
}
