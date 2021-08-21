# blackbird
A Promises/A+ conformant implementation (https://promisesaplus.com/)

Usage:

```javascript
const Blackbird = require("./blackbird")

const buildPromise = (pet) => {
    return new Blackbird((resolve, reject) => {
        setTimeout(() => {
            if (pet === 'dog') return resolve('good pet');
            return reject('bad pet');
        }, 3000); 
    });
}

const promise = buildPromise('dog');

promise.then((value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
});
```

TODO: `then` must return a promise https://promisesaplus.com/#point-40