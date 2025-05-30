import db from "$lib/db";
import { ObjectId } from "mongodb";
import { error, redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const id = params.player_id;

  if (!ObjectId.isValid(id)) {
    throw error(400, "Ungültige ID");
  }

  const player = await db.getPlayer(id);

  if (!player) {
    throw error(404, "Spieler nicht gefunden.");
  }

  return { player };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("_id");

    if (!ObjectId.isValid(id)) {
      return { error: "Ungültige ID" };
    }

    try {
      await db.updatePlayer(id, {
        name: data.get("name"),
        birthdate: data.get("birthdate"),
        nationality: data.get("nationality")?.split("/")?.map(n => n.trim()) ?? [],
        position: data.get("position"),
        number: Number(data.get("number")),
        value: data.get("value") ? Number(data.get("value")) : null,
        team_id: data.get("team_id")
      });
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      return {
        error: "Fehler beim Speichern"
      };
    }

    // Erfolgreich → weiterleiten mit Hinweis
    throw redirect(303, "/database?updated=1");
  }
};
