import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("Spielerdatenbank");

//////////////////////////////////////////
// Players
//////////////////////////////////////////

async function getAllPlayers() {
  try {
    const collection = db.collection("Players");
    const players = await collection.find({}).toArray();
    players.forEach((player) => {
      player._id = player._id.toString();
    });
    return players;
  } catch (error) {
    console.error("Fehler in getAllPlayers:", error.message);
    throw error; 
  }
}

async function getPlayer(id) {
  try {
    const collection = db.collection("Players");
    const player = await collection.findOne({ _id: new ObjectId(id) });
    if (player) player._id = player._id.toString();
    return player;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function createPlayer(player) {
  try {
    const collection = db.collection("Players");
    const result = await collection.insertOne(player);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function updatePlayer(id, updateObj) {
  try {
    const collection = db.collection("Players");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObj }
    );
    return result.matchedCount > 0 ? id : null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}


async function deletePlayer(id) {
  try {
    const collection = db.collection("Players");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

async function getPlayersByTeam(team_id) {
  try {
    const collection = db.collection("Players");
    const players = await collection.find({ team_id }).toArray();
    players.forEach((player) => {
      player._id = player._id.toString();
    });
    return players;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

//////////////////////////////////////////
// Teams
//////////////////////////////////////////

async function getTeamById(team_id) {
  try {
    const collection = db.collection("Teams");
    const team = await collection.findOne({ team_id });
    if (team) team._id = team._id.toString();
    return team;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

//////////////////////////////////////////
// Export
//////////////////////////////////////////

export default {
  getAllPlayers,
  getPlayersByTeam,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTeamById
};
