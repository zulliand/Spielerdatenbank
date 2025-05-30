<script>
  // Props im Runes-Mode holen
  const { data } = $props();

  // Absicherung und Umwandlung des birthdate in yyyy-mm-dd Format
  const birthdateISO = (() => {
    if (!data.player.birthdate) return ""; // Falls kein Datum vorhanden
    if (typeof data.player.birthdate === "string") {
      // Falls schon String, z.B. ISO-Format mit Zeitstempel
      return data.player.birthdate.split("T")[0];
    }
    if (data.player.birthdate instanceof Date) {
      // Falls ein Date-Objekt, in ISO-String konvertieren und Datumsteil extrahieren
      return data.player.birthdate.toISOString().split("T")[0];
    }
    // Fallback leerer String
    return "";
  })();

  // Zustand kopieren mit Absicherung für nationality und Geburtstagsformat
  const player = $state({
    ...data.player,
    nationality: Array.isArray(data.player.nationality)
      ? data.player.nationality // Wenn nationality schon Array, unverändert übernehmen
      : typeof data.player.nationality === "string" &&
          data.player.nationality.length > 0
        ? [data.player.nationality] // String in Array umwandeln
        : [], // Sonst leeres Array
    birthdate: birthdateISO, // Berechnetes ISO-Datum für das Input-Feld
  });
</script>

<h1>Spieler <strong>{player.name}</strong> bearbeiten</h1>

<form method="POST">
  <!-- Versteckte MongoDB ID -->
  <input type="hidden" name="_id" value={player._id} />

  <!-- Name -->
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input
      name="name"
      id="name"
      class="form-control"
      type="text"
      value={player.name}
      required
    />
  </div>

  <!-- Geburtsdatum -->
  <div class="mb-3">
    <label for="birthdate" class="form-label">Geburtsdatum</label>
    <input
      name="birthdate"
      id="birthdate"
      class="form-control"
      type="date"
      value={player.birthdate}
      required
    />
  </div>

  <!-- Nationalität (String mit / getrennt) -->
  <div class="mb-3">
    <label for="nationality" class="form-label"
      >Nationalität(en) Falls mehrere Nationalitäten: bitte mit / trennen (z. B.
      Schweiz/Deutschland)</label
    >
    <input
      name="nationality"
      id="nationality"
      class="form-control"
      type="text"
      value={player.nationality.join("/")}
    />
  </div>

  <!-- Position -->
  <div class="mb-3">
    <label for="position" class="form-label">Position</label>
    <input
      name="position"
      id="position"
      class="form-control"
      type="text"
      value={player.position}
      required
    />
  </div>

  <!-- Rückennummer -->
  <div class="mb-3">
    <label for="number" class="form-label">Rückennummer</label>
    <input
      name="number"
      id="number"
      class="form-control"
      type="number"
      value={player.number}
      required
    />
  </div>

  <!-- Marktwert -->
  <div class="mb-3">
    <label for="value" class="form-label">Marktwert (CHF)</label>
    <input
      name="value"
      id="value"
      class="form-control"
      type="number"
      value={player.value ?? ""}
    />
  </div>

  <!-- Team-Auswahl -->
  <div class="mb-3">
    <label for="team_id" class="form-label">Team</label>
    <select name="team_id" id="team_id" class="form-select">
      <option value="t1" selected={player.team_id === "t1"}
        >1. Mannschaft</option
      >
      <option value="t2" selected={player.team_id === "t2"}>U21</option>
    </select>
  </div>

  <!-- Buttons -->
  <button type="submit" class="btn btn-success">Änderungen speichern</button>
  <a href="/database" class="btn btn-secondary ms-2">Abbrechen</a>
</form>
