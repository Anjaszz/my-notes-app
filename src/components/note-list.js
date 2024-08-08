import NotesApi from '../data/notesApi.js';
import './note-item.js';
import './note-input.js';
import './loading-indicator.js';

class NoteList extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await this.renderNotes();

    this.addEventListener('editNote', (e) => {
      const { id, title, body } = e.detail;
      this.showEditForm(id, title, body);
    });

    document.addEventListener('newNote', () => {
      this.renderNotes();
    });

    document.addEventListener('searchNotes', async (e) => {
      const searchValue = e.detail;
      await this.filterNotes(searchValue);
    });
  }

  async renderNotes(archived = false) {
    this.innerHTML = `
      <loading-indicator></loading-indicator>
      <div class="button-container">
        <button id="showArchivedNotes">Show Archived Notes</button>
        <button id="showActiveNotes">Show Active Notes</button>
      </div>
      <div class="notes-grid"></div>
    `;
    const notesGrid = this.querySelector('.notes-grid');
    const showArchivedNotesButton = this.querySelector('#showArchivedNotes');
    const showActiveNotesButton = this.querySelector('#showActiveNotes');
    const loadingIndicator = this.querySelector('loading-indicator');

    loadingIndicator.show();

    let notes;
    try {
      if (archived) {
        notes = await NotesApi.getArchivedNotes();
      } else {
        notes = await NotesApi.getNotes();
      }

      notes.forEach((note) => {
        const noteElement = document.createElement('note-item');
        noteElement.setAttribute('note-id', note.id);
        noteElement.setAttribute('title', note.title);
        noteElement.setAttribute('body', note.body);
        noteElement.setAttribute('archived', note.archived);
        notesGrid.appendChild(noteElement);
      });

      notesGrid.style.display = 'grid';
      notesGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      notesGrid.style.gridGap = '20px';
      notesGrid.style.padding = '20px';
      notesGrid.style.maxWidth = '1200px';
      notesGrid.style.margin = '0 auto';
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      loadingIndicator.hide();
    }

    showArchivedNotesButton.addEventListener('click', async () => {
      await this.renderNotes(true);
    });

    showActiveNotesButton.addEventListener('click', async () => {
      await this.renderNotes(false);
    });
  }

  showEditForm(id, title, body) {
    const noteInput = document.querySelector('note-input');
    noteInput.openModal();
    noteInput.fillForm(id, title, body);
  }

  async filterNotes(searchValue) {
    const notes = this.querySelectorAll('note-item');
    notes.forEach((note) => {
      const title = note.getAttribute('title').toLowerCase();
      const body = note.getAttribute('body').toLowerCase();
      const matches = title.includes(searchValue.toLowerCase()) || body.includes(searchValue.toLowerCase());
      note.style.display = matches ? 'block' : 'none';
    });
  }
}

customElements.define('note-list', NoteList);
