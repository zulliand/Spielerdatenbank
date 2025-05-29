<script>
  // ❌ KEIN import von $props
   const { data } = $props(); // ✅ funktioniert

  // ✅ Hilfsfunktion bleibt gleich
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
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{player.name}</h5>
            <p class="card-text">
              Position: {player.position}<br />
              Rückennummer: {player.number}<br />
              Marktwert: {player.value?.toLocaleString()} CHF<br />
              Nationalität: {Array.isArray(player.nationality) ? player.nationality.join(" / ") : player.nationality || "–"}<br />
              Geburtsdatum: {new Date(player.birthdate).toLocaleDateString()}<br />
              Alter: {getAge(player.birthdate)} Jahre
            </p>
          </div>
        </div>
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
