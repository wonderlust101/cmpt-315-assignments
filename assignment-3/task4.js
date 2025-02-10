function deepFlattenAndExtract(input) {
    if (!input)
        return []

    return input.reduce((acc, item) => {
        // If the item is a number, add it directly
        if (typeof item === 'number') {
            acc.push(item);

            // If the item is an array, call itself
        } else if (Array.isArray(item)) {
            acc = acc.concat(deepFlattenAndExtract(item));

            // If the item is an object, filter out numbers
        } else if (typeof item === 'object' && item !== null) {
            const nestedValues = deepFlattenAndExtract(Object.values(item));
            acc = acc.concat(nestedValues);
        }

        return acc;
    }, []);
}

// Test Case 1:
const input1 = [
    1, [2, 3, {a: 4, b: 'ignore'}], {c: 5, d: [6, {e: 7}]}, 'text', [8, [9, 10]]
]
console.log(deepFlattenAndExtract(input1))


// Test Case 2:
const input2 = [
    42, {a: 100, b: 'string'}, [300, {c: 400}, [500]], 'hello'
]
console.log(deepFlattenAndExtract(input2))


// Test Case 3:
const input3 = [
    {a: {b: {c: 1}}}, [2, [3]], 4
]
console.log(deepFlattenAndExtract(input3))


// Test Case 4:
const input4 = [
    {}, [], 'string', false, null, undefined
]
console.log(deepFlattenAndExtract(input4))


// Test Case 5:
const input5 = [
    10, [20, [30, {nested: 40}]], {deep: {deeper: {deeper: {deeper: {deeper: {deepest: 50}}}}}}
]
console.log(deepFlattenAndExtract(input5))


// Test Case 6: Empty array
const emptyInput = [];
console.log(deepFlattenAndExtract(emptyInput));


// Test Case 7: Null
const nullInput = null;
console.log(deepFlattenAndExtract(nullInput));


// Test Case 8: Undefined
const undefinedInput = undefined;
console.log(deepFlattenAndExtract(undefinedInput));