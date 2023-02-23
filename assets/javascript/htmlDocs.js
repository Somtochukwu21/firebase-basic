// get HTML documents
export function getHTML() {
  const addBook = document.querySelector(".add");
  const deleteBook = document.querySelector(".delete");
  const updateBook = document.querySelector(".update");

  return {
    addBook,
    deleteBook,
    updateBook,
  };
}
