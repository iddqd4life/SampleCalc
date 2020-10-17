var english_textarea, russian_textarea, calc_btn, output_block;
var rusSample, engSample;

var samplesData = JSON.parse(samples);

function init() {
    english_textarea = document.getElementById("english_textarea");
    russian_textarea = document.getElementById("russian_textarea");
    insert_text_btn = document.getElementById("insert_text");
    calc_btn = document.getElementById("calc_btn");

    english_output = document.getElementById("english_output");
    russian_output = document.getElementById("russian_output");

    final_output = document.getElementById("final_output");

    insert_text_btn.onclick = insertText;
    calc_btn.onclick = calculateAll;
}

function initSample() {
    engSample = new Sample(english_textarea.value);
    rusSample = new Sample(russian_textarea.value);

    console.log(engSample.text);
    console.log(rusSample.text);
}

function insertText() {
    english_textarea.value = samplesData[0].JustForFun_English;
    russian_textarea.value = samplesData[0].JustForFun_Russian;

    console.log(samplesData[0].JustForFun_English.length);
    console.log(samplesData[0].JustForFun_Russian.length);
}

function calculateAll() {
    initSample();

    english_output.innerHTML = engSample.alphabetFreq();
    russian_output.innerHTML = rusSample.alphabetFreq();

    english_output.innerHTML += engSample.сalcEntropy();
    russian_output.innerHTML += rusSample.сalcEntropy();

    english_output.innerHTML += engSample.calcDAbsolute();
    russian_output.innerHTML += rusSample.calcDAbsolute();

    english_output.innerHTML += engSample.calcDRelative();
    russian_output.innerHTML += rusSample.calcDRelative();

    final_output.innerHTML = calcWitchBetter();
}

function calcWitchBetter() {
    if (engSample.DRelative < rusSample.DRelative) {
        return "Выгоднее использовать англоязычную версию текста.";
    } else if (rusSample.DRelative < engSample.DRelative) {
        return "Выгоднее использовать русскоязычную версию текста.";
    } else {
        return "Можно использовать любую версию текста.";
    }
}


init();