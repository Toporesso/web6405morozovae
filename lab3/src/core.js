/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n === (n | 0));
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    let res = [];
    for (let i = 2; i <= 20; i++) {
        res.push(i);
    }
    return res;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n + recSumTo(n - 1)
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    while (n > 1) {
        if (n % 2 === 0) {
            n /= 2;
        }
        else {
            return false;
        }
    }
    return true;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    let res = [1, 1];
    for (let i = 2; i <= n; i++) {
        res.push(res[i - 2] + res[i - 1]);
    }
    return res[n - 1];
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (operatorFn) {
        let storedValue = initialValue;
        return function (newValue) {
            storedValue = operatorFn(storedValue, newValue);
            return storedValue;
        };
    }
    else {
        return function () {
            return initialValue;
        };
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start;
    return function() {
        const result = current;
        current += step;
        return result;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;
    if (typeof firstObject !== "object" || firstObject === null || typeof secondObject !== "object" || secondObject === null) {
        return false;
    }

    let keys1 = Object.keys(firstObject), keys2 = Object.keys(secondObject);
    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};



console.log(isInteger(5)); // true
console.log(even()); // [2, 4, 6, ..., 20]
console.log(sumTo(5)); // 15
console.log(recSumTo(5)); // 15
console.log(factorial(5)); // 120
console.log(isBinary(8)); // true
console.log(isBinary(10)); // false
console.log(fibonacci(6)); // 8
console.log(getOperationFn(10, (a, b) => a + b)(5)); // 15
console.log(getOperationFn(10)(5)); // 10 (если нет операции)
let seqGen = sequence(5, 2);
console.log(seqGen()); // 5
console.log(seqGen()); // 7
console.log(deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'})); // true
console.log(deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'})); // false
