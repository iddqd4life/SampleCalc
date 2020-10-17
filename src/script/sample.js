function Sample(text) {
    this.text = text.replace(/[^A-Za-zА-Яа-я0-9]/gi, '').trim();

    this.alphabet = calculateCharQuantity(this.text);
    this.entropy = calcEntropy(this.alphabet, this.text.length);
    this.hartley = calcHartley(this.text.length);
    this.DAabsolute = calcDAbsolute(this.hartley, this.entropy);
    this.DRelative = calcDRelative(this.DAabsolute, this.hartley);

    this.getAlphabet = function() {
        return this.alphabet;
    }

    this.getEntropy = function() {
        return this.entropy;
    }

    this.getHartley = function() {
        return this.hartley;
    }

    this.getDAbsolute = function() {
        return this.DAabsolute;
    }

    this.getDRelative = function() {
        return this.DRelative;
    }
}