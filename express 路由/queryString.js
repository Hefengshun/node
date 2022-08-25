module.exports = function (url) {
    let query = {};
    let queryArr = url.split("&")
    queryArr.forEach(element => {
        let key = element.split("=")
        query[key[0]] = key[1]
    });

    return query
}