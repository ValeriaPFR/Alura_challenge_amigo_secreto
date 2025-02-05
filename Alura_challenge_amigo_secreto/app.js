let amigos = [];

// Función para agregar amigo
function agregarAmigo() {
    let amigo = document.getElementById("amigo").value.trim();

    if (amigo === "") {
        alert("Debes ingresar un amigo");
        return;
    }

    if (amigos.includes(amigo)) {
        alert("Este amigo ya fue agregado");
        return;
    }

    amigos.push(amigo);
    document.getElementById("amigo").value = "";
    actualizarListaAmigos();
}

// Función para actualizar lista de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = '';

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${amigo}`;
        listaAmigos.appendChild(li);
    });
}

// Función para sortear amigos
function sortearAmigos() {
    if (amigos.length < 3) {
        alert("Deben haber al menos 3 amigos en la lista para realizar sorteo");
        return;
    }

    let asignaciones = {};
    let copiaAmigos = [...amigos];

    // Mezclar la lista de amigos aleatoriamente
    copiaAmigos = copiaAmigos.sort(() => Math.random() - 0.5);

    // Verificar que nadie se asigne a sí mismo
    let intento = 0;
    while (intento < 100) {
        let valido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === copiaAmigos[i]) {
                valido = false;
                break;
            }
        }
        if (valido) break;
        copiaAmigos = copiaAmigos.sort(() => Math.random() - 0.5);
        intento++;
    }

    // Si después de muchos intentos no se logra una asignación válida, avisar
    if (intento >= 100) {
        alert("No se pudo hacer un sorteo válido. Inténtalo de nuevo.");
        return;
    }

    // Asignar los amigos sorteados
    amigos.forEach((amigo, index) => {
        asignaciones[amigo] = copiaAmigos[index];
    });

    mostrarResultados(asignaciones);
}

// Función para mostrar los resultados
function mostrarResultados(asignaciones) {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = '';

    for (const [amigo, asignado] of Object.entries(asignaciones)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} le regala a ${asignado}`;
        resultados.appendChild(li);
    }
}
