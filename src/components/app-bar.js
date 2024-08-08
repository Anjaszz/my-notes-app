// components/app-bar.js
class AppBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <header>
        <h1>My Notes App</h1>
        <button id="addNoteBtn">+ Add Note</button>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);
