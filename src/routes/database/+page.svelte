<script>
  import { onMount } from 'svelte';
  const { data } = $props();

  let showSuccess = $state(false);
  let showUpdated = $state(false);
  let showDeleted = $state(false);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);

    showSuccess = params.get("success") === "1";
    showUpdated = params.get("updated") === "1";
    showDeleted = params.get("deleted") === "1";

    if (showSuccess || showUpdated || showDeleted) {
      const url = new URL(window.location.href);

      if (showSuccess) url.searchParams.delete("success");
      if (showUpdated) url.searchParams.delete("updated");
      if (showDeleted) url.searchParams.delete("deleted");

      window.history.replaceState({}, "", url);
    }
  });
</script>

<div class="header">
  <h1>Spielerdatenbank</h1>
  <a href="/players/create" class="btn btn-success"> ➕ Spieler hinzufügen </a>
</div>

<!-- Alerts -->
{#if showSuccess}
  <div class="alert alert-success mt-3">✅ Spieler erfolgreich erstellt!</div>
{/if}

{#if showUpdated}
  <div class="alert alert-info mt-3">✏️ Spieler erfolgreich geändert!</div>
{/if}

{#if showDeleted}
  <div class="alert alert-warning mt-3">🗑️ Spieler erfolgreich gelöscht!</div>
{/if}

<table class="table table-striped mt-4">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Team</th>
      <th style="text-align: right;">Aktionen</th>
    </tr>
  </thead>
  <tbody>
    {#each data.players as player}
      <tr>
        <td>{player.name}</td>
        <td>{player.position}</td>
        <td>{player.team_id === "t1" ? "1. Mannschaft" : "U21"}</td>
        <td>
          <a href={`/players/${player._id}/edit`} class="btn btn-sm btn-primary"
            >Bearbeiten</a
          >
          <form
            method="POST"
            action={`/players/${player._id}/delete`}
            style="display:inline;"
          >
            <button type="submit" class="btn btn-sm btn-danger ms-1"
              >Löschen</button
            >
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  td:last-child {
    text-align: right;
    white-space: nowrap;
  }
</style>
