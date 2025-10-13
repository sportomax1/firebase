(async () => {
  const config = window.__APP_CONFIG__;
  if (!config) {
    const container = document.getElementById('output');
    if (container) container.textContent = '❌ env.js not loaded!';
    console.error('env.js missing or not loaded');
    return;
  }

  const { FIREBASE_API_KEY, FIREBASE_DB_URL } = config;

  if (!FIREBASE_API_KEY || !FIREBASE_DB_URL) {
    document.getElementById('output').textContent = '❌ Config missing';
    return;
  }

  const container = document.getElementById('output');
  if (!container) return;

  const url = `${FIREBASE_DB_URL}/students.json?auth=${FIREBASE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const data = await response.json();
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    container.textContent = '🚨 Error: ' + err.message;
    console.error(err);
  }
})();
