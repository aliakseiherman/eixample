interface Promise<T> {
    done(done: () => void): Promise<void>//overly simplistic, should be oveloded if we want this to be general propose
    fail(done: () => void): Promise<void>//overly simplistic, should be oveloded if we want this to be general propose
}

Promise.prototype.done = Promise.prototype.then;
Promise.prototype.fail = Promise.prototype.catch;