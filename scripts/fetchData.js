(async () => {
  const { FIREBASE_API_KEY, FIREBASE_DB_URL } = window.__APP_CONFIG__;

  if (!FIREBASE_API_KEY || !FIREBASE_DB_URL) {
    document.getElementById('output').textContent = '❌ Config missing';
    return;
  }

  // Example: read /students.json
  const url = `${FIREBASE_DB_URL}/students.json?auth=${FIREBASE_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();

    const container = document.getElementById('output');
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    document.getElementById('output').textContent = '🚨 Error: ' + err.message;
  }
})();
