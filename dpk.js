const crypto = require("crypto");

function createHash(input) {
  return crypto.createHash("sha3-512").update(input).digest("hex");
}

function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  // Returns 0 when no event is provided
  if(!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If the event has a partition key, return it
  // If there is an event but no partition key, return the hash of the event
  if (event.partitionKey) {
    candidate = event.partitionKey;
  } 
  
  // else {
  //   const data = JSON.stringify(event);
  //   candidate = createHash(data);
  // }

  // Convert the partition key to a string if it is not already
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  
  // Check if the candidate key is too long
  if (!event.partitionKey || candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  
  return candidate;
};

module.exports ={
  deterministicPartitionKey,
  createHash
}