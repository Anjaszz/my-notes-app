import './style/style.css';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-list.js';

document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.querySelector('#addNoteBtn');
  const noteInput = document.querySelector('note-input');

  addNoteBtn.addEventListener('click', () => {
    noteInput.openModal();
  });
});
