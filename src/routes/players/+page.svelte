<script>
  // Props aus Routing
  const { data } = $props();

  // Altersberechnung
  function getAge(dateString) {
    const dob = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  // Dateiname für Bild aus Namen generieren
  function toImageFilename(name, ext = 'webp') {
    return name
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // übrige Zeichen
      .replace(/[^a-z0-9]+/g, "-") // Leerzeichen & Sonderzeichen zu Bindestrich
      .replace(/^-+|-+$/g, "") + `.${ext}`;
  }

  // Bildpfad erzeugen
  function getImagePath(name, ext = 'webp') {
    return `/images/players/${toImageFilename(name, ext)}`;
  }

  const fallbackImage = '/images/default-player.webp';
</script>

{#if data.team}
  <!-- Titelzeile: Name + Liga rechts -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="mb-0">{data.team.name}</h1>
    <span class="badge bg-danger fs-5">{data.team.league}</span>
  </div>

  <!-- Trainer -->
  <h5 class="mt-4">Trainer</h5>
  <div class="row mb-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h6 class="card-subtitle text-muted mb-1">Trainer</h6>
          <p class="card-text fw-bold">{data.team.coach}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Spieler -->
  <h5 class="mt-4">Spieler</h5>
  <div class="row mb-5">
    {#each data.players as player}
      <div class="col-md-4 mb-4">
        <!-- Link zur Detailseite -->
        <a href={`/players/${player._id}`} class="text-decoration-none text-dark">
          <div class="card h-100">
            <img
              src={getImagePath(player.name)}
              alt={player.name}
              class="img-fluid rounded-top"
              onerror={(event) => {
                if (!event.target.dataset.fallback) {
                  event.target.src = fallbackImage;
                  event.target.dataset.fallback = 'true';
                }
              }}
            />

            <div class="card-body">
              <h5 class="card-title">{player.name}</h5>
              <p class="card-text">
                Position: {player.position}<br />
                Alter: {getAge(player.birthdate)} Jahre
              </p>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>

  <!-- Staff -->
  {#if data.team.staff_members?.length > 0}
    <h5 class="mt-4">Staff</h5>
    <div class="row mb-5">
      {#each data.team.staff_members as staff}
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h6 class="card-subtitle text-muted mb-1">{staff.role}</h6>
              <p class="card-text fw-bold">{staff.name}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
{/if}
