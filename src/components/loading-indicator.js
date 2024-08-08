class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="loading-indicator">
          <div class="spinner"></div>
          <p>Loading...</p>
        </div>
      `;
    this.style.display = 'none';
    this.style.position = 'fixed';
    this.style.top = '50%';
    this.style.left = '50%';
    this.style.transform = 'translate(-50%, -50%)';
    this.style.zIndex = '1000';
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.style.color = 'white';
    this.style.padding = '20px';
    this.style.borderRadius = '5px';
    this.style.textAlign = 'center';
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
