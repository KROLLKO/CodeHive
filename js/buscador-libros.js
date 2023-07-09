const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("bookContainer");

// Función para realizar la búsqueda y mostrar los resultados
const searchBooks = (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const searchTerm = searchInput.value.trim(); // Obtiene el término de búsqueda
  if (searchTerm === "") {
    return; // Si no hay término de búsqueda, no se realiza nada
  }

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

  // Utilizamos la función fetch para obtener los datos de la API
  fetch(url)
    .then(response => response.json()) // Convertimos la respuesta a JSON
    .then(data => {
      bookContainer.innerHTML = ""; // Limpiamos el contenedor de libros

      // Recorremos los resultados y creamos elementos HTML para cada libro
      data.docs.slice(0, 5).forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Autor: ${book.author_name ? book.author_name.join(", ") : "Desconocido"}</p>
          <p>Año de publicación: ${book.first_publish_year || "Desconocido"}</p>
          <button>Ver más</button>
          <hr>
        `;

        // Agregamos el evento de clic para redirigir al libro
        bookElement.addEventListener("click", () => {
          window.location.href = `https://openlibrary.org${book.key}`;
        });

        // Agregamos el elemento del libro al contenedor
        bookContainer.appendChild(bookElement);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    })
    .finally(() => {
      searchInput.value = ""; // Limpiamos el campo de búsqueda después de la búsqueda
    });
};

// Escuchamos el evento de envío del formulario
searchForm.addEventListener("submit", searchBooks);