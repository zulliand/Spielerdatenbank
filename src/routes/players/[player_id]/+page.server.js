import db from '$lib/db.js';

export async function load({ params }) {
  const id = params.player_id;
  const player = await db.getPlayer(id); // ✅ ruft getPlayer(id) aus deiner db.js auf

  if (!player) {
    return {
      status: 404,
      error: new Error('Spieler nicht gefunden')
    };
  }

  const imageFilename = player.name
    .toLowerCase()  // alles klein                                    
    .replace(/ä/g, "ae")  // Umlaute umwandeln
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Akzente entfernen (é → e)
    .replace(/[^a-z0-9]+/g, "-")  // alles Nicht-Alphanumerische zu "-"
    .replace(/^-+|-+$/g, "") + `.webp`; // überflüssige Bindestriche am Anfang und Ende entfernen // Dateiendung anhängen

  // Spieler + Bilddateiname an die Seite weitergeben
  return {
    player,
    imageFilename
  };
}
