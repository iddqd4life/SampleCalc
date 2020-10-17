function calculateCharQuantity(text) {
    let alphabet = {};

    for (var char in text) {
        alphabet[text[char].toLocaleLowerCase()] = 0;
    }

    for (var char in text) {
        alphabet[text[char].toLocaleLowerCase()]++;
    }

    return alphabet;
}

function calcHartley(len) {
    return calcLog(len, 2).toFixed(2);
}

function calcEntropy(alphabet, len) {
    let entropy = 0;

    for (var char in alphabet) {
        entropy += (alphabet[char] / len) * calcLog(len / alphabet[char], 2).toFixed(2);
    }

    return entropy;
}

function calcDAbsolute(hartley, entropy) {
    return (hartley - entropy).toFixed(2);
}

function calcDRelative(DAbsolute, hartley) {
    return (DAbsolute / hartley).toFixed(2);
}

function calcLog(a, b) {
    return Math.log(a) / Math.log(b);
}

function calcWhichBetter(DRelative_rus, DRelative_eng) {
    if (DRelative_rus < DRelative_eng) {
        return "Лучше использовать русскоязычный текст.";
    } else if (DRelative_eng < DRelative_rus) {
        return "Лучше использовать англоязычный текст.";
    } else {
        return "Можно использовать любой текст."
    }
}