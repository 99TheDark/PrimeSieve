import {time} from "./time.js";

// Prime Sieves
function prime(limit, type) {
    switch(type) {
        case "eratosthenes": return eratosthenes(limit);
        case "atkin": return atkin(limit);
    }
}

// Sieve of Eratosthenes
function eratosthenes(limit) {
    let nums = Array(limit).fill(true);
    let primes = [2];
    let last_prime = 2;
    outer: while(last_prime <= limit) {
        for(let i = last_prime; i < limit; i += last_prime) {
            nums[i] = false;
        }

        for(let i = last_prime + 1; ; i++) {
            if(nums[i]) {
                last_prime = i;
                break;
            }
            if(i >= limit - 1) {
                break outer;
            }
        }

        primes.push(last_prime);
    }

    return primes;
}

// Sieve of Atkin
function atkin(limit) {
    let primes = [2, 3, 5];
    let nums = Array(limit).fill(false);

    let swap = (n, eq, op = () => true) => {
        for(let y = 0; y < limit; y++) {
            for(let x = 0; x < limit; x++) {
                if(eq(x, y) == n && op(x, y)) {
                    nums[n] = !nums[n];
                }
            }
        }
    }

    for(let n = 0; n < limit; n++) {
        let r = n % 60;
        if(r == 1 || r == 13 || r == 17 || r == 29 ||
            r == 37 || r == 41 || r == 49 || r == 53) {
            swap(n, (x, y) => 4 * x * x + y * y);
        } else if(r == 7 || r == 19 || r == 31 || r == 43) {
            swap(n, (x, y) => 3 * x * x + y * y);
        } else if(r == 11 || r == 23 || r == 47 || r == 59) {
            swap(n, (x, y) => 3 * x * x - y * y, (x, y) => x > y);
        }
    }

    for(let i = 5; i < limit; i++) {
        let p = nums[i];
        if(!p) continue;

        primes.push(i);

        let j = i * i;
        while(j < limit) {
            nums[j] = false;
            j *= 2;
        }
    }

    return primes;
}

console.log(await time(() => prime(1000, "eratosthenes")));
console.log(await time(() => prime(1000, "atkin")));