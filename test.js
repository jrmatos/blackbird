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

console.log(promise.state);

promise.then((value) => {
    console.log(value);
    console.log(promise.state);
}, (reason) => {
    console.log(reason);
});