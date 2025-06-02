import db from "$lib/db";
import { redirect, fail } from "@sveltejs/kit";

// Definiert die Aktionen für das Formular auf /players/create
export const actions = {
  default: async ({ request }) => {
    // Liest die Formulardaten aus dem Request (POST)
    const form = await request.formData();

    // Eingaben vorbereiten
    const rawNationality = form.get("nationality") || "";
    const nationality = rawNationality
      .split("/") // Trennt den String an jedem "/"
      .map(n => n.trim()) // Entfernt überflüssige Leerzeichen
      .filter(n => n.length > 0); // Entfernt leere Einträge

    // Neues Spielerobjekt aus den Formulardaten zusammenbauen
    const player = {
      name: form.get("name"),
      position: form.get("position"),
      number: form.get("number"),
      value: form.get("value"),
      nationality,
      birthdate: form.get("birthdate"),
      team_id: form.get("team_id")
    };

    try {
      // Versuch, den Spieler in der Datenbank zu speichern
      await db.createPlayer(player);
    } catch (err) {
      console.error("Fehler beim Hinzufügen:", err);
      return fail(500, { message: "Spieler konnte nicht gespeichert werden." });
    }

    // Nach erfolgreichem Speichern: Weiterleitung zur Übersicht mit Erfolgsmeldung
    throw redirect(303, "/database?success=1");
  }
};
