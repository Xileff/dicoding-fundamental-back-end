const NotesHandler = require('./handler');
const routes = require('./routes');

// Plugin
// Alur :
// 1. Buat object NotesHandler
// 2. Buat route dengan parameter obj NotesHandler tsb
module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
