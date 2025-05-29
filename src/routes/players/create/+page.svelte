<script>
  let { form } = $props();
</script>

<a href="/database" class="btn btn-secondary mb-3">Zurück</a>
<h1>Neuen Spieler hinzufügen</h1>

<form method="POST">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input name="name" id="name" class="form-control" type="text" required />
  </div>

  <div class="mb-3">
    <label for="position" class="form-label">Position</label>
    <input name="position" id="position" class="form-control" type="text" />
  </div>

  <div class="mb-3">
    <label for="number" class="form-label">Rückennummer</label>
    <input name="number" id="number" class="form-control" type="number" />
  </div>

  <div class="mb-3">
    <label for="value" class="form-label">Marktwert (CHF)</label>
    <input name="value" id="value" class="form-control" type="number" />
  </div>

  <div class="mb-3">
    <label for="nationality" class="form-label">Nationalität(en) Falls mehrere Nationalitäten: bitte mit / trennen (z. B. Schweiz/Deutschland)</label>
    <input
      type="text"
      name="nationality"
      id="nationality"
      class="form-control"
      placeholder="z. B. Schweiz oder Schweiz/Italien"
    />
  </div>

  <div class="mb-3">
    <label for="birthdate" class="form-label">Geburtsdatum</label>
    <input
      name="birthdate"
      id="birthdate"
      class="form-control"
      type="date"
      required
    />
  </div>

  <div class="mb-3">
    <label for="team_id" class="form-label">Team</label>
    <select name="team_id" id="team_id" class="form-select">
      <option value="t1">1. Mannschaft</option>
      <option value="t2">U21</option>
    </select>
  </div>

  <button type="submit" class="btn btn-primary">Spieler hinzufügen</button>
</form>

{#if form?.success}
  <div class="alert alert-success mt-3">Spieler erfolgreich erstellt!</div>
{/if}
