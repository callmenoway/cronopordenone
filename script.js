import fetch from 'node-fetch';

const serverUrl = 'http://localhost:3000';

const loadManifestazione = async () => {
  const url = `${serverUrl}/api/manifestazione`;
  const response = await fetch(url);
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
