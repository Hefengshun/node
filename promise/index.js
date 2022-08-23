(function () {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3)
        }, 500)
        // setTimeout(() => {
        //     reject(new Error());
        // }, 600);
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
    console.log(promise);
    setTimeout(() => {
        console.log(promise, '12312312');
    }, 800);
})();
