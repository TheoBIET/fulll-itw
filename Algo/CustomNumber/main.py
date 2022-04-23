arrays = [
    [1, 2, 3],
    [9, 9]
]

increment = lambda x: [i + 1 for i in x]

for array in arrays:
    print(increment(array))