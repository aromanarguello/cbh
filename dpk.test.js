const { deterministicPartitionKey, createHash } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return Partition key if one is provided as string", () => {
    const event = {
      partitionKey: "partitionKey"
    }
    const trivialKey = deterministicPartitionKey(event)
    
    expect(trivialKey).toBe(event.partitionKey);
  })

  it("Should return hash if provided partion key is too long", () => {
    const event = {
      partitionKey: 'a'.repeat(257)
    }
    const trivialKey = deterministicPartitionKey(event)
    
    expect(trivialKey).toBe(createHash(event.partitionKey));
  })

  it('Should convert partionkey into string', () => {
    const event = {
      partitionKey: 123
    }
    const trivialKey = deterministicPartitionKey(event)
    
    expect(trivialKey).toBe("123");
  })

  it('Should return hash when number input event given', ()=> {
    const event = 23132312
    const trivialKey = deterministicPartitionKey(event)

    const hash = createHash(JSON.stringify(event))
    
    expect(trivialKey).toBe(hash);

  })

  it('Should return hash when input event given with different data types', ()=> {
    const event = ['a', 'b']
    const trivialKey = deterministicPartitionKey(event)
    const hash = createHash(JSON.stringify(event))
    
    expect(trivialKey).toBe(hash);

  })

  it('Should return has if candidate is longer than 256', ()=> {
    const event = 'a'.repeat(257)
    const trivialKey = deterministicPartitionKey(event)
    const hash = createHash(JSON.stringify(event))
    
    expect(trivialKey).toBe(hash);
  })
});
