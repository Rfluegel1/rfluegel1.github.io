function sortAlpha(foodList) {
    // takes a list of Foods, returns a sorted list
    foodList.sort(function(a, b) {
        if (a.foodname < b.foodname) { return -1 }
        if (a.foodname > b.foodname) { return 1 }
        return 0
    })
    return foodList
}

function sortByExpiryDec(foodList) {
    // returns list of foods closest to expiration first
    foodList.sort(function(a, b) {
        if (a.dateOfExpiry < b.dateOfExpiry) { return -1 }
        if (a.dateOfExpiry > b.dateOfExpiry) { return 1 }
        return 0
    })
    return foodList
}

function sortByExpiryAsc(foodList) {
    // returns list of foods further from expiration first
    return sortByExpiryDec(foodList).reverse()
}

// TODO:
// requires implementation of group field in Food class
// function sortByGroup() {
//
// }
