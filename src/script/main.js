var english_textarea, russian_textarea, calc_btn, output_block;
var rusSample, engSample;

var samplesData = JSON.parse(samples);

function init() {
    start_page = document.getElementById("start_page");
    calc_page = document.getElementById("calc_page");

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

    russian_entropy = document.getElementById("russian_entropy_val");
    english_entropy = document.getElementById("english_entropy_val");

    russian_DRelative = document.getElementById("russian_DRelative");
    russian_DAbsolute = document.getElementById("russian_DAbsolute");

    english_DRelative = document.getElementById("english_DRelative");
    english_DAbsolute = document.getElementById("english_DAbsolute");

    better_text = document.getElementById("better_text");

    info_btn = document.getElementById("info_btn");
    about_block = document.getElementById("about_block");
    close_about_btn = document.getElementById("close_btn");
    retry_btn = document.getElementById("retry_btn");

    english_textarea.onkeyup = checkEnglishTextarea;
    russian_textarea.onkeyup = checkRussianTextarea;

    calc_btn.onclick = calculateAll;
    
    info_btn.onclick = switchAbout;
    close_about_btn.onclick = switchAbout;
    
    retry_btn.onclick = function() {
        changeScreen(calc_page, start_page);
    }
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

function changeScreen(removable, replacer) {
    removable.classList.remove("visible");
    replacer.classList.add("visible");
}

function switchAbout() {
    if (!(about_block.classList.contains("about__block__visible"))) {
        about_block.classList.add("about__block__visible");
    } else {
        about_block.classList.remove("about__block__visible");
        about_block.classList.add("about__block__hide");

        setTimeout(function() {
            about_block.classList.remove("about__block__hide");
        }, 200);
    }
}

function calculateAll() {
    
    if (english_textarea.value == "" || russian_textarea.value == "") {
        return false;
    }

    initSample();

    russian_entropy.innerHTML = rusSample.getEntropy();
    english_entropy.innerHTML = engSample.getEntropy();

    russian_DAbsolute.innerHTML = rusSample.getDAbsolute();
    russian_DRelative.innerHTML = rusSample.getDRelative();

    english_DAbsolute.innerHTML = engSample.getDAbsolute();
    english_DRelative.innerHTML = engSample.getDRelative();

    better_text.innerHTML = calcWhichBetter(rusSample.getDRelative(), engSample.getDRelative());

    changeScreen(start_page, calc_page);
}

init();