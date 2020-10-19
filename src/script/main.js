var english_textarea, russian_textarea, calc_btn, output_block;
var rusSample, engSample;

var samplesData = JSON.parse(samples);

function init() {
    english_textarea = document.getElementById("english_text");
    russian_textarea = document.getElementById("russian_text");

    engCharCounterText = document.getElementById("english_char_counter");
    rusCharCounterText = document.getElementById("russian_char_counter");

    engCounterBlock = document.getElementById("english_char_counter_block");
    rusCounterBlock = document.getElementById("russian_char_counter_block");

    engCounterIcon = document.getElementById("english_text_icon");
    rusCounterIcon = document.getElementById("russian_text_icon");

    autofill_btn = document.getElementById("autofill_btn");
    autofill_btn.onclick = insertText;

    calc_btn = document.getElementById("next_btn");

    english_textarea.onkeyup = checkEnglishTextarea;
    russian_textarea.onkeyup = checkRussianTextarea;

    //calc_btn.onclick = calculateAll;
}

function checkTextAreas() {
    if (russian_textarea.value.length >= 1000 && english_textarea.value.length >= 1000) {
        calc_btn.classList.remove("confirm__button__unactive");
        calc_btn.classList.add("confirm__button__active");
    } else {
        calc_btn.classList.remove("confirm__button__active");
        calc_btn.classList.add("confirm__button__unactive");
    }
}

function checkRussianTextarea() {
    rusCharCounterText.innerHTML = russian_textarea.value.length;

    if (russian_textarea.value.length >= 1000) {
        rusCounterBlock.classList.remove("char__counter__unactive");
        rusCounterIcon.classList.remove("text__lock");

        rusCounterBlock.classList.add("char__counter__active");
        rusCounterIcon.classList.add("text__unlock");
    } else {
        rusCounterBlock.classList.remove("char__counter__active");
        rusCounterIcon.classList.remove("text__unlock");

        rusCounterBlock.classList.add("char__counter__unactive");
        rusCounterIcon.classList.add("text__lock");
    }

    checkTextAreas();
}

function checkEnglishTextarea() {
    engCharCounterText.innerHTML = english_textarea.value.length;

    if (english_textarea.value.length >= 1000) {
        engCounterBlock.classList.remove("char__counter__unactive");
        engCounterIcon.classList.remove("text__lock");

        engCounterBlock.classList.add("char__counter__active");
        engCounterIcon.classList.add("text__unlock");
    } else {
        engCounterBlock.classList.remove("char__counter__active");
        engCounterIcon.classList.remove("text__unlock");

        engCounterBlock.classList.add("char__counter__unactive");
        engCounterIcon.classList.add("text__lock");
    }

    checkTextAreas();
}

function initSample() {
    engSample = new Sample(english_textarea.value);
    rusSample = new Sample(russian_textarea.value);
}

function insertText() {
    english_textarea.value = samplesData[0].JustForFun_English;
    russian_textarea.value = samplesData[0].JustForFun_Russian;

    english_textarea.classList.add("textareas__animate");
    russian_textarea.classList.add("textareas__animate");

    checkEnglishTextarea();
    checkRussianTextarea();

    checkTextAreas();

    setTimeout(function() {
        english_textarea.classList.remove("textareas__animate");
        russian_textarea.classList.remove("textareas__animate");
    }, 200);
}

function calculateAll() {
    initSample();

    if (english_textarea.value == "" || russian_textarea.value == "") {
        english_output.innerHTML = russian_output.innerHTML = "";
        final_output.innerHTML = "Обнаружены пустые поля, для начала вставьте или напишите текст.";
        
        return false;
    }

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