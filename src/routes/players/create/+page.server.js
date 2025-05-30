import db from "$lib/db";
import { redirect, fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    // Eingaben vorbereiten
    const rawNationality = form.get("nationality") || "";
    const nationality = rawNationality
      .split("/")
      .map(n => n.trim())
      .filter(n => n.length > 0);

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
      // NUR das hier ist im try
      await db.createPlayer(player);
    } catch (err) {
      console.error("Fehler beim Hinzufügen:", err);
      return fail(500, { message: "Spieler konnte nicht gespeichert werden." });
    }

    // Redirect außerhalb vom try ✅
    throw redirect(303, "/database?success=1");
  }
};
