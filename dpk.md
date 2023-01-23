<a name="deterministicPartitionKey"></a>

## deterministicPartitionKey(event) ⇒ <code>string</code>
Receives an event that could contain a partition key in attribute `partitionKey`, or not.
Returns a partition key that is guaranteed to be a string of length <= 256.

If the event does not contain a partition key, it will generate one using the event data.

**Kind**: global function  
**Returns**: <code>string</code> - partition key  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 

