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
}

function calculateAll() {
    initSample();

    english_output.innerHTML = genOutput(engSample);
    russian_output.innerHTML = genOutput(rusSample);

    final_output.innerHTML = calcWhichBetter(rusSample.getDRelative(), engSample.getDRelative());
}

function genOutput(s) {
    let output = "";
    
    for (var char in s.getAlphabet()) {
        output += "\"" + char + "\": " + s.alphabet[char] + ". Вероятность: " + (s.alphabet[char] / s.text.length).toFixed(4) + "<br/>";
    }

    output += "Энтропия: " + s.getEntropy() + "<br/>";
    output += "Абсолютная избыточность: " + s.getDAbsolute() + "<br/>";
    output += "Относительная избыточность: " + s.getDRelative() + "<br/>";

    return output;
}

init();