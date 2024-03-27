export async function time(fn) {
    let start = performance.now();
    return new Promise((resolve, reject) => {
        fn();
        resolve(`${ performance.now() - start }ms`);
    });
}