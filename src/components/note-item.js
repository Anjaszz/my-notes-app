import { gsap } from 'gsap';
import NotesApi from '../data/notesApi.js';

class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const noteId = this.getAttribute('note-id');
    const archived = this.getAttribute('archived') === 'true';

    this.innerHTML = `
      <div class="note-card">
        <h3>${title}</h3>
        <hr>
        <p>${body}</p>
        <small>Created at: ${new Date().toLocaleString()}</small>
        <div class="button-container">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
          <button class="archive-button">${archived ? 'Unarchive' : 'Archive'}</button>
        </div>
      </div>
    `;

    const editBtn = this.querySelector('.edit-button');
    const deleteBtn = this.querySelector('.delete-button');
    const archiveBtn = this.querySelector('.archive-button');

    editBtn.addEventListener('click', () => {
      const editEvent = new CustomEvent('editNote', {
        bubbles: true,
        detail: {
          id: noteId,
          title: title,
          body: body,
        },
      });
      this.dispatchEvent(editEvent);
    });

    deleteBtn.addEventListener('click', async () => {
      const confirmDelete = confirm(
        'Apakah Anda yakin ingin menghapus catatan ini?'
      );
      if (confirmDelete) {
        await NotesApi.deleteNote(noteId);
        gsap.to(this, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            this.remove();
            document.dispatchEvent(new CustomEvent('newNote'));
          },
        });
      }
    });

    archiveBtn.addEventListener('click', async () => {
      const confirmArchive = confirm(
        `Apakah Anda yakin ingin ${archived ? 'mengembalikan' : 'mengarsipkan'} catatan ini?`
      );
      if (confirmArchive) {
        if (archived) {
          await NotesApi.unarchiveNote(noteId);
        } else {
          await NotesApi.archiveNote(noteId);
        }
        gsap.to(this, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            this.remove();
            document.dispatchEvent(new CustomEvent('newNote'));
          },
        });
      }
    });

    // Tambahkan animasi saat catatan ditambahkan
    gsap.from(this, { duration: 0.5, opacity: 0, y: -20 });
  }
}

customElements.define('note-item', NoteItem);
