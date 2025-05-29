import db from "$lib/db";

export async function load() {
  const players = await db.getAllPlayers();

  return { players };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deletePlayer(data.get("id"));
  }
};
