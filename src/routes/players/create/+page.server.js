import db from "$lib/db";
import { redirect, fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    try {
      const form = await request.formData();

      const player = {
        name: form.get("name"),
        position: form.get("position"),
        number: form.get("number"),
        value: form.get("value"),
        nationality: form.get("nationality"),
        birthdate: form.get("birthdate"),
        team_id: form.get("team_id")
      };

      await db.createPlayer(player); 

      throw redirect(303, "/database");
    } catch (err) {
      console.error("Fehler beim Hinzufügen:", err);
      return fail(500, { message: "Spieler konnte nicht gespeichert werden." });
    }
  }
};
