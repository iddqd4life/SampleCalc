function Sample(text) {
    this.text = text.replace(/[^A-Za-zА-Яа-я0-9]/gi, '').trim();
    this.alphabet = {};

    this.alphabetFreq = function() {
        for (var char in this.text) {
            this.alphabet[this.text[char].toLocaleLowerCase()] = 0;
        }
        
        for (var char in this.text) {
            this.alphabet[this.text[char].toLocaleLowerCase()]++;
        }

        var out = "";

        for (var letter in this.alphabet) {
            out += '"' + letter + '": ' + this.alphabet[letter] + ". Вероятность: " + this.alphabet[letter] / this.text.length + ".<br>";
        }

        this.calcHartley();

        return out;
    }

    this.сalcEntropy = function() {
        this.entropy = 0;

        for (var letter in this.alphabet) {
            this.entropy += (this.alphabet[letter] / this.text.length) * calcLog(this.text.length / this.alphabet[letter], 2).toFixed(2);
        }

        return "Энтропия: " + this.entropy + "<br/>";
    }

    this.calcHartley = function() {
        this.hartley = calcLog(this.text.length, 2).toFixed(2);
    }

    this.calcDAbsolute = function() {
        this.DAabsolute = (this.hartley - this.entropy).toFixed(2);

        return "Абсолютная избыточность: " + this.DAabsolute + "<br/>";
    }


    this.calcDRelative = function() {
        this.DRelative = (this.DAabsolute / this.hartley).toFixed(2);

        return "Относительная избыточность: " + this.DRelative + "<br/>";
    }

    function calcLog(a, b) {
        return Math.log(a) / Math.log(b);
    }
}