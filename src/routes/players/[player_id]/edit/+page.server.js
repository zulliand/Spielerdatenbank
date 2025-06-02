import db from "$lib/db";
import { ObjectId } from "mongodb";
import { error, redirect } from "@sveltejs/kit";

// Lädt den Spieler anhand der URL-ID, um ihn im Bearbeitungsformular anzuzeigen
export async function load({ params }) {
  const id = params.player_id;

  // Validierung: Ist die ID überhaupt eine gültige MongoDB-ObjectId?
  if (!ObjectId.isValid(id)) {
    throw error(400, "Ungültige ID");
  }

  // Spieler mit passender ID aus der Datenbank laden
  const player = await db.getPlayer(id);

  // Falls kein Spieler gefunden wurde → 404-Fehler anzeigen
  if (!player) {
    throw error(404, "Spieler nicht gefunden.");
  }

  // Erfolgreich → Spielerobjekt an die Seite weitergeben
  return { player };
}

// Aktionen, die beim Absenden des Bearbeitungsformulars ausgelöst werden
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("_id");

    // Validierung: Ist die ID gültig?
    if (!ObjectId.isValid(id)) {
      return { error: "Ungültige ID" };
    }

    try {
      // Spielerinformationen aktualisieren mit Werten aus dem Formular
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
      // Fehlerbehandlung: z. B. Verbindungsfehler oder falsche Daten
      console.error("Fehler beim Aktualisieren:", err);
      return {
        error: "Fehler beim Speichern"
      };
    }

    // Erfolgreich → weiterleiten mit Hinweis
    throw redirect(303, "/database?updated=1");
  }
};
