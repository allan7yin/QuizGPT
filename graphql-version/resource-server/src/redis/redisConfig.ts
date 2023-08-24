import { createClient } from "redis";

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

// redis will store quizzes and hold them for 3 hours, also. Upon loading, will load set into memory of all quizId, will allow for more effeciet querying
export default client;
