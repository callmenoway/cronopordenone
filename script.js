const fetch = require('node-fetch');

const loadManifestazione = async () => {
  const response = await fetch('/api/manifestazione');
  const data = await response.json();
  if (data.length === 0) {
    document.querySelector('h1').textContent = 'Nessun risultato pubblicato';
    return;
  }
  const manifestazione = data[0];
  document.querySelector('h1').textContent = manifestazione.nome;
  document.querySelector('#data').textContent = manifestazione.data;
  document.querySelector('#tipo').textContent = manifestazione.tipo;
  const pdfElement = document.querySelector('#pdf');
  pdfElement.href = `/uploads/${manifestazione.file}`;
  pdfElement.textContent = manifestazione.file;
};

loadManifestazione();
