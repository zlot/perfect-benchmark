# perfect-benchmark
The only Node.js benchmarking library you'll need.

![Example screenshot](https://adrianwirth.com/benchmark.png)

## Installation

`npm install perfect-benchmark`

## Usage

### Basic Usage

The usage of perfect-benchmark is super simple. An example can be seen below:

```javascript
const benchmark = require("perfect-benchmark");

benchmark(callback => {
        // do complex computing here...

        callback();
}, "complex stuff");
```

### Advanced Usage

By default the function passed to `benchmark` is called 25 times, as can be seen in the screenshot above. If you need it to be executed a different amout of times, you can set the amount via `benchmark`'s third parameter.

If you want to specify a callback to be called after the benchmark has completed, you can pass it as a fourth parameter.

The following example demonstrates these two features.

```javascript
const benchmark = require("perfect-benchmark");

benchmark(callback => {
        // do complex computing here...

        callback();
}, "complex stuff", 5, () => {  // execute 5 times
    console.log("benchmarking complete!");
});
```
