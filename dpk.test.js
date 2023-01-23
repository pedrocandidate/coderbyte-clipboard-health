import crypto from "crypto";
import { deterministicPartitionKey } from "./dpk.js";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '0' when given '0' as candidate partition key", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: '0' });
    expect(trivialKey).toBe("0");
  });
  it("Returns the SHA3-512 digest when given an object as partition key", () => {
    const input = { a: '0' };
    const sha3512digest = crypto.createHash("sha3-512").update(JSON.stringify(input)).digest("hex");
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(sha3512digest);
  });
  it("Returns smaller candidate partition key when given a larger than 256", () => {
    const input = { partitionKey: "a".repeat(257) };
    const sha3512digest = crypto.createHash("sha3-512").update(input.partitionKey).digest("hex");
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(sha3512digest);
  });
  it("Fails if input candidate object is not serializable", () => {
    const input = {};
    input.partitionKey = input;
    expect(() => deterministicPartitionKey(input)).toThrow();
  })
  it("Fails if input object is not serializable", () => {
    const input = {};
    input.input = input;
    expect(() => deterministicPartitionKey(input)).toThrow();
  })
});
