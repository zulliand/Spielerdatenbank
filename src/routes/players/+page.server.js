import db from "$lib/db";

export async function load({ url }) {
  const team_id = url.searchParams.get("t") || "t1";

  return {
    players: await db.getPlayersByTeam(team_id),
    team: await db.getTeamById(team_id)
  };
}
