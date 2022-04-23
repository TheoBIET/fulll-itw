const arrays = [
    [1, 2, 3],
    [9, 9]
]

const increment = (arr) => {
    return arr.map(item => item + 1)
}

for (const arr of arrays) {
    console.log(increment(arr))
}