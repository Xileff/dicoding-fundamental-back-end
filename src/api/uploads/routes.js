const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/images',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'), // mengarah ke folder file di dalem folder uploads ini
      },
    },
  },
];

module.exports = routes;

/*
Alur kerja path GET
1. Ada request dengan path /upload/{param*}
2. Masuk ke handler.directory.path
3. Arahkan ke folder bernama 'file'
4. {param*} menunjukkan alamat lengkap file

Contoh
Ada request http://localhost:5000/upload/images/1675928956487yuta.jpg
Methodnya GET dengan path /upload/{param*}
Langkahnya :
1. Handler mengarahkan ke folder 'file'
2. Saat ini request masuk di dalam folder 'file'
3. Dari folder 'file', dilanjutkan dengan membaca param images/1675928956487yuta.jpg
4. Gambar diperoleh
*/