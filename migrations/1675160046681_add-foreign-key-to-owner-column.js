/* eslint-disable max-len */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')");

  // memberi nilai owner pada note lama karena owner-nya pasti NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // memberikan constraint FK pada owner thdp kolom id dari tabel users
  pgm.addConstraint('notes', 'fk_notes.owner_users_id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // mengembalikan nilai owner old_notes menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner IS 'old_notes'");

  // menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};

/*
Sebelum menuliskan berkas migrations, ada sedikit pencerahan untuk Anda.

Anda mengerti bahwa Notes Apps dan Notes API dikembangkan dan dirilis secara bertahap. Itu berarti fitur yang dimilikinya pula hadir secara berangsur-angsur. Nah, pada versi pertama Notes Apps, kita semua tahu fitur autentikasi dan otorisasi belum hadir, dengan begitu catatan yang disimpan pada versi pertama tentu tidak memiliki nilai owner.

Masalahnya adalah bagaimana caranya kita menerapkan constraint foreign key pada kolom owner, sedangkan tabel notes memiliki data owner yang kosong? Apakah bisa? Jawabannya tentu tidak! Ketika kita memutuskan untuk mengikat kolom owner dengan foreign key, maka kolom tersebut tidak boleh bernilai selain dari referensi kolom yang digunakan, termasuk nilai yang kosong.

Lantas bagaimana solusinya? Menghapus data catatan yang tidak memiliki nilai owner? Mungkin di tahap development bisa menjadi solusi, karena data catatan hanya sebatas pengujian semata. Namun, dalam production, tentu itu bukan solusi yang terbaik, karena data catatan lama tentu akan lenyap dari sistem kita. Bila ada solusi yang tetap membuat data utuh, mengapa tidak?

Ada! Yaitu dengan membuat satu user baru yang memang digunakan untuk memiliki (owned) catatan yang tidak memiliki owner. Jadi, seluruh catatan yang tidak memiliki nilai owner akan diisi dengan dengan id user baru tersebut. Dengan begitu data tidak akan hilang dan kita tetap bisa menerapkan foreign key.

Yuk, sekarang kita mulai tulis kode migrationnya. Kemudian kita akan melakukan migrasi dengan langkah-langkah berikut:

1.Membuat User baru dengan nilai Id yang sudah ditentukan.
2. Mengisi nilai owner pada catatan yang kosong dengan Id User baru.
3. Menambahkan foreign key pada kolom owner.
*/
