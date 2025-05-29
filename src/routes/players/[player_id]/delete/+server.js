import db from "$lib/db";
import { ObjectId } from "mongodb";
import { error, redirect } from "@sveltejs/kit";

export async function POST({ params }) {
  const id = params.player_id;

  if (!ObjectId.isValid(id)) {
    throw error(400, "Ungültige ID");
  }

  const deletedId = await db.deletePlayer(id);

  if (!deletedId) {
    throw error(404, "Spieler nicht gefunden oder bereits gelöscht");
  }

  throw redirect(303, "/database");
}
