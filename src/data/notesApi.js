import Swal from 'sweetalert2';

const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static createNote(note) {
    return fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil menambahkan note baru',
        });
        return data;
      })
      .catch((error) => {
        console.error('Gagal menambahkan note baru:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menambahkan note baru',
        });
      });
  }

  static getNotes() {
    return fetch(`${API_BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { data: notes } = responseJson;
        return Promise.resolve(notes);
      });
  }

  static deleteNote(noteId) {
    return fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal menghapus note');
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil menghapus note',
        });
        return data;
      })
      .catch((error) => {
        console.error('Gagal menghapus note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menghapus note',
        });
      });
  }

  static archiveNote(noteId) {
    return fetch(`${API_BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengarsipkan note');
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil mengarsipkan note',
        });
        return data;
      })
      .catch((error) => {
        console.error('Gagal mengarsipkan note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal mengarsipkan note',
        });
      });
  }

  static unarchiveNote(noteId) {
    return fetch(`${API_BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengembalikan note');
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil mengembalikan note',
        });
        return data;
      })
      .catch((error) => {
        console.error('Gagal mengembalikan note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal mengembalikan note',
        });
      });
  }

  static getArchivedNotes() {
    return fetch(`${API_BASE_URL}/notes/archived`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { data: notes } = responseJson;
        return Promise.resolve(notes);
      });
  }
}

export default NotesApi;
