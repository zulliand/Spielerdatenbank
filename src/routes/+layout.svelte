<script>
  const { children } = $props(); // Runes: kein Import nötig
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">FC Winterthur</a>
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
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/players?t=t1">1. Mannschaft</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/players?t=t2">U21</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/database">Datenbank</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://www.transfermarkt.ch/schnellsuche/ergebnis/schnellsuche?query=fc+winterthur"
            target="_blank"
            rel="noopener"
          >
            Transfermarkt
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
