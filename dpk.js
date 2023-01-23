import crypto from "crypto";

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function safeJSONStringify (obj, targetName) {
  try {
    const str = JSON.stringify(obj);
    return str;
  } catch (e) {
    // throw more descriptive error
    throw new Error(`Provided ${targetName} is not serializable`);
  }
}

function generateCandidate (input) {
  return crypto.createHash("sha3-512").update(input).digest("hex");
}

/**
 * Receives an event that could contain a partition key in attribute `partitionKey`, or not.
 * Returns a partition key that is guaranteed to be a string of length <= 256.
 * 
 * If the event does not contain a partition key, it will generate one using the event data.
 * 
 * @param {Event} event 
 * @returns {string} partition key
 */
export function deterministicPartitionKey(event) {
  let candidate;

  if (event?.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = safeJSONStringify(event, "event");
    candidate = generateCandidate(data);
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== "string") {
    candidate = safeJSONStringify(candidate, "candidate partition key");
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateCandidate(candidate);
  }

  return candidate;
}
