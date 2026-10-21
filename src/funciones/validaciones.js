// Expresiones regulares basadas en tu script.js original
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSoloLetras = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
const regexTelefono = /^\+?[0-9\s]{8,15}$/; // Campo de contexto

export const validarLogin = (correo, contrasena) => {
  const errores = {};

  if (!correo) {
    errores.correo = "Debe ingresar su correo electrónico";
  } else if (!regexCorreo.test(correo)) {
    errores.correo = "Debe ingresar un correo electrónico válido";
  }

  if (!contrasena) {
    errores.contrasena = "Debe ingresar su contraseña";
  } else if (contrasena.length < 6) {
    errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
  }

  return errores;
};

export const validarRegistro = (datos) => {
  const errores = {};

  // --- Validaciones originales del script.js ---
  if (!datos.nombre) {
    errores.nombre = "Debe ingresar su nombre";
  } else if (!regexSoloLetras.test(datos.nombre)) {
    errores.nombre = "El nombre debe contener solo letras";
  }

  if (!datos.apellido) {
    errores.apellido = "Debe ingresar su apellido";
  } else if (!regexSoloLetras.test(datos.apellido)) {
    errores.apellido = "El apellido debe contener solo letras";
  }

  if (!datos.correo) {
    errores.correo = "Debe ingresar su correo electrónico";
  } else if (!regexCorreo.test(datos.correo)) {
    errores.correo = "Debe ingresar un correo electrónico válido";
  }

  if (!datos.contrasena) {
    errores.contrasena = "Debe ingresar una contraseña";
  } else if (datos.contrasena.length < 6) {
    errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!datos.confirmarContrasena) {
    errores.confirmarContrasena = "Debe confirmar su contraseña";
  } else if (datos.contrasena !== datos.confirmarContrasena) {
    errores.confirmarContrasena = "Las contraseñas no coinciden";
  }

  if (!datos.fechaNacimiento) {
    errores.fechaNacimiento = "Debe ingresar su fecha de nacimiento";
  }

  // --- Campos de contexto (Requisito Crítico de la pauta) ---
  if (!datos.telefono) {
    errores.telefono = "Debe ingresar su teléfono";
  } else if (!regexTelefono.test(datos.telefono)) {
    errores.telefono = "Debe ingresar un teléfono válido";
  }

  if (!datos.direccion) {
    errores.direccion = "Debe ingresar su dirección o comuna";
  }

  if (!datos.tipoCliente) {
    errores.tipoCliente = "Debe seleccionar un tipo de cliente";
  }

  return errores;
};

// Validación para el Panel de Control (CRUD en memoria)
export const validarProducto = (datos) => {
  const errores = {};

  if (!datos.nombre) {
    errores.nombre = "Debe ingresar el nombre del producto";
  }

  if (!datos.categoria) {
    errores.categoria = "Debe seleccionar una categoría";
  }

  if (!datos.precio) {
    errores.precio = "Debe ingresar el precio";
  } else if (datos.precio <= 0) {
    errores.precio = "El precio debe ser mayor a 0";
  }

  if (!datos.stock) {
    errores.stock = "Debe ingresar el stock";
  } else if (datos.stock < 0) {
    errores.stock = "El stock no puede ser negativo";
  }

  if (!datos.descripcion) {
    errores.descripcion = "Debe ingresar una descripción";
  }

  return errores;
};