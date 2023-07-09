const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("bookContainer");


const searchBooks = (event) => {
  event.preventDefault(); 

  const searchTerm = searchInput.value.trim(); 
  if (searchTerm === "") {
    return; 
  }

  
  const messageElement = document.createElement("div");
  messageElement.textContent = "Buscando el libro, espere...";
  bookContainer.appendChild(messageElement);

  
  setTimeout(() => {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

    
    fetch(url)
      .then(response => response.json()) 
      .then(data => {
        bookContainer.innerHTML = ""; 

        
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

          
          bookElement.addEventListener("click", () => {
            window.location.href = `https://openlibrary.org${book.key}`;
          });

          
          bookContainer.appendChild(bookElement);
        });
      })
      .catch(error => {
        console.error("Error:", error);
      })
      .finally(() => {
        searchInput.value = ""; 
      });
  }, 3000); 
};


searchForm.addEventListener("submit", searchBooks);


