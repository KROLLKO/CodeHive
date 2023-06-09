// Formulario
let datosJSONconvertido = {
  claveDelObjetoARRAYS: []
};

let mensajeMostrado = false;

const agregarUsuario = () => {
  if (mensajeMostrado) {
    return; // Si el mensaje ya ha sido mostrado, salir de la función
  }

  let nombre = document.getElementById('nombre').value;
  let correo = document.getElementById('correo').value;
  let contrasena = document.getElementById('contrasena').value;

  const nuevoUsuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena
  };

  datosJSONconvertido.claveDelObjetoARRAYS.push(nuevoUsuario);

  console.log('Datos JSON convertidos con nuevos usuarios:');
  console.log(datosJSONconvertido);

  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('contrasena').value = '';

  mostrarMensaje('¡Felicidades! Has completado tu registro exitosamente.');
  mensajeMostrado = true; // Marcar el mensaje como mostrado
};

const mostrarMensaje = (mensaje) => {
  // Crear elemento de mensaje si aún no se ha mostrado
  if (!mensajeMostrado) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.add('mensaje');

    const formulario = document.querySelector('.form');
    formulario.appendChild(mensajeElement);
  }
};
