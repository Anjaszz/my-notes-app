import NotesApi from '../data/notesApi.js';
import './loading-indicator.js';

class NoteInput extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div id="noteInputModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Judul</p>
          <form id="noteForm">
            <input type="hidden" id="noteId">
            <input type="text" id="noteTitle" placeholder="Judul" required>
            <p>Isi catatan</p>
            <textarea id="noteContent" placeholder="Isi catatan" required></textarea>
            <button id="addNoteBtn" type="submit">Simpan Perubahan</button>
          </form>
        </div>
      </div>
      <loading-indicator></loading-indicator>
    `;

    const modal = this.querySelector('#noteInputModal');
    const closeBtn = this.querySelector('.close');
    const noteForm = this.querySelector('#noteForm');
    const noteIdInput = this.querySelector('#noteId');
    const noteTitle = this.querySelector('#noteTitle');
    const noteContent = this.querySelector('#noteContent');
    const loadingIndicator = this.querySelector('loading-indicator');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    noteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loadingIndicator.show();

      const noteId = noteIdInput.value;
      const note = {
        title: noteTitle.value,
        body: noteContent.value,
      };

      try {
        if (noteId) {
          await NotesApi.updateNote(noteId, note);
        } else {
          await NotesApi.createNote(note);
        }

        const event = new CustomEvent('newNote');
        document.dispatchEvent(event);

        noteForm.reset();
        modal.style.display = 'none';
      } catch (error) {
        console.error('Failed to save note:', error);
      } finally {
        loadingIndicator.hide();
      }
    });
  }

  openModal() {
    const modal = this.querySelector('#noteInputModal');
    modal.style.display = 'block';
  }

  fillForm(id, title, body) {
    const noteIdInput = this.querySelector('#noteId');
    const noteTitle = this.querySelector('#noteTitle');
    const noteContent = this.querySelector('#noteContent');

    noteIdInput.value = id;
    noteTitle.value = title;
    noteContent.value = body;
  }
}

customElements.define('note-input', NoteInput);
