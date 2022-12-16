export const saveOnStorage = (key, element) => {
  // Conseguir los elementos que ya tenemos guardadmos en localStorage
  let elements = JSON.parse(localStorage.getItem(key))

  // Comprobar si hay algo en el localStorage (un array) o nada
  if(Array.isArray(elements)){
    // Si hay -> Añadimos al array
    elements.push(element)
  }else{
    // Si no hay -> Creamos el array y luego añadimos
    elements = [element]
  }

  // Para guardar en el localStorage necesitamos una clave
  // Además, se guarda en formato String
  localStorage.setItem("cards", JSON.stringify(elements))

  // Devolvemos el objeto guardado
}