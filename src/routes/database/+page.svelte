<script>
  const { data } = $props(); 
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between; /* Überschrift links, Button rechts */
    align-items: center;
    margin-bottom: 1rem;
  }
  td:last-child {
    text-align: right;
    white-space: nowrap;
  }
</style>

<div class="header">
  <h1>Spielerdatenbank</h1>
  <a href="/players/create" class="btn btn-success">
    ➕ Spieler hinzufügen
  </a>
</div>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Team</th>
    </tr>
  </thead>
  <tbody>
    {#each data.players as player}
      <tr>
        <td>{player.name}</td>
        <td>{player.position}</td>
        <td>{player.team_id === 't1' ? '1. Mannschaft' : 'U21'}</td>
        <td>
          <a href={`/players/${player._id}/edit`} class="btn btn-sm btn-primary">Bearbeiten</a>
          <form method="POST" action="?/delete" style="display:inline;">
            <input type="hidden" name="id" value={player._id} />
            <button type="submit" class="btn btn-sm btn-danger ms-1">Löschen</button>
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
