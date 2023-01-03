// Routing
// Alur
// 1. Route memanggil handler
// 2. Handler memanggil Service
// 3. Service menjalankan CRUD
const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
  }, {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;
