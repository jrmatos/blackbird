const Blackbird = require("./blackbird")

const buildPromise = (pet) => {
    return new Blackbird((resolve, reject) => {
        setTimeout(() => {
            if (pet === 'dog') return resolve('good pet');
            return reject('bad pet');
        }, 1000); 
    });
}

const promise = buildPromise('dog');

promise.then((value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
});