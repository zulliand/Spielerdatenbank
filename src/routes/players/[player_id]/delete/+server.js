import db from "$lib/db";
import { ObjectId } from "mongodb";
import { error, redirect } from "@sveltejs/kit";

// Diese Funktion wird aufgerufen, wenn ein POST-Request an /players/[id]/delete geschickt wird
export async function POST({ params }) {
  const id = params.player_id;

  if (!ObjectId.isValid(id)) {
    throw error(400, "Ungültige ID");
  }

  // Löscht den Spieler aus der Datenbank anhand der ID
  const deletedId = await db.deletePlayer(id);

  if (!deletedId) {
    throw error(404, "Spieler nicht gefunden oder bereits gelöscht");
  }

  // Erfolgreich gelöscht → Redirect mit Hinweis
  throw redirect(303, "/database?deleted=1");
}
