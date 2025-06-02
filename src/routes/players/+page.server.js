import db from "$lib/db";

// Diese Funktion wird aufgerufen, bevor die Seite im Browser gerendert wird
export async function load({ url }) {
  // Liest den URL-Parameter ?t=... aus der Adresse
  const team_id = url.searchParams.get("t") || "t1";

  return {
    // Rückgabe von zwei Daten:
    // - alle Spieler des gewählten Teams (für die Spielerliste)
    // - die Teaminformationen selbst (z. B. Name, Coach, Liga)
    players: await db.getPlayersByTeam(team_id),
    team: await db.getTeamById(team_id)
  };
}
