const fetch = require('node-fetch');

const deleteManifestazione = async () => {
  await fetch('/api/manifestazione', {
    method: 'DELETE',
  });
  window.location.reload();
};

document.querySelector('#delete').addEventListener('click', deleteManifestazione);
