<script>
  // Zugriff auf die aktuelle URL – z. B. um den aktiven Reiter zu erkennen
  import { page } from '$app/stores';
  // CSS-Datei für globales Styling importieren
  import './styles.css';
  // Runes-API: Zugriff auf den Inhalt der aktuellen Seite
  const { children } = $props();
</script>

<!-- Navigationsleiste -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">FC Winterthur</a>
    <!-- Toggle-Button für mobile Ansicht -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Navigationslinks wenn man auf dem richtigen Pfad ist wird es dunkler dargestellt -->
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            class:fw-bold={$page.url.pathname === '/players' && $page.url.searchParams.get('t') === 't1'}
            href="/players?t=t1"
          >1. Mannschaft</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            class:fw-bold={$page.url.pathname === '/players' && $page.url.searchParams.get('t') === 't2'}
            href="/players?t=t2"
          >U21</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            class:fw-bold={$page.url.pathname === '/database'}
            href="/database"
          >Datenbank</a>
        </li>
         <!-- externer Link in Reiter -->
        <li class="nav-item">
          <a class="nav-link" href="https://www.transfermarkt.ch/schnellsuche/ergebnis/schnellsuche?query=fc+winterthur" target="_blank" rel="noopener">
            Transfermarkt
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!-- Hauptbereich der Seite – hier wird der eigentliche Seiteninhalt eingefügt -->
<div class="container mt-3">
  {@render children()}
</div>
