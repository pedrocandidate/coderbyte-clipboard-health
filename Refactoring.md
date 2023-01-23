# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### 1. 100% test coverage for the current implementation

Though 100% test coverage does not guarantee that all possible outcomes are covered, it does guarantee that it covers more than tests with less than 100% coverage.

In fact the test suite includes exception tests for some problematic inputs even if it wasn't necessary to increase the coverage.

```bash
$ npm run test:coverage

> cbh-take-home-project@1.0.0 test:coverage
> jest --coverage

 PASS  ./dpk.test.js
  deterministicPartitionKey
    ✓ Returns the literal '0' when given no input (2 ms)
    ✓ Returns the literal '0' when given '0' as candidate partition key (1 ms)
    ✓ Returns the SHA3-512 digest when given an object as partition key
    ✓ Returns smaller candidate partition key when given a larger than 256
    ✓ Fails if input candidate object is not serializable (6 ms)
    ✓ Fails if input object is not serializable (1 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 dpk.js   |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.39 s, estimated 1 s
Ran all test suites.
```

### 2. Added ES6 support

Babel is a JavaScript compiler that allows us to use the latest JavaScript features. In this particular case, it allows us to use import statements which are part of the ES6 standard.

### 3. Separated constants and reusable functions from the main function

Since this file is focused on the `deterministicPartitionKey` function, I moved the constants and the reusable functions outside the main function.

### 4. Reduced complexity of the main function

The main function was refactored in order to have fewer nested if's and a more straightforward overall logic.

### 5. Added code documentation

Added JSDoc markup to the exported function and generated documentation in `dpk.md`.