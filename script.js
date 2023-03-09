let nombre, ej1, ej2, parcial, final, notaFinal, mensaje, continuar;

do {
    nombre = prompt("Ingrese el nombre del alumno:");

    ej1 = parseFloat(prompt("Ingrese la nota del Ejercicio 1:"));
    while (ej1 > 10) {
        ej1 = parseFloat(prompt("La nota del Ejercicio 1 no puede ser mayor a 10. Ingrese una nota válida:"));
    }

    ej2 = parseFloat(prompt("Ingrese la nota del Ejercicio 2:"));
    while (ej2 > 10) {
        ej2 = parseFloat(prompt("La nota del Ejercicio 2 no puede ser mayor a 10. Ingrese una nota válida:"));
    }

    parcial = parseFloat(prompt("Ingrese la nota del Examen Parcial:"));
    while (parcial > 10) {
        parcial = parseFloat(prompt("La nota del Examen Parcial no puede ser mayor a 10. Ingrese una nota válida:"));
    }

    final = parseFloat(prompt("Ingrese la nota del Examen Final:"));
    while (final > 10) {
        final = parseFloat(prompt("La nota del Examen Final no puede ser mayor a 10. Ingrese una nota válida:"));
    }

    // nota final
    notaFinal = (ej1 * 0.15) + (ej2 * 0.15) + (parcial * 0.3) + (final * 0.4);
    notaFinal = parseFloat(notaFinal.toFixed(2)); // 2 decimales


    mensaje = `${nombre} tiene de nota ${notaFinal}.`;
    if (notaFinal >= 4) {
        mensaje += " Por lo que está APROBADO.";
    } else {
        mensaje += " Por lo que está DESAPROBADO.";
    }

    // mensaje
    alert(mensaje);

    // Pregunta
    continuar = confirm("¿Desea continuar ingresando notas?");
} while (continuar);