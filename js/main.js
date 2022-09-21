"use strict";

const QUANTITY_PICTURES = 25;

const LIKES = {
    min: 15,
    max: 200
};

const AVATARS = 6;
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

const COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];

let names = [
    'Jhon',
    'Mike',
    'April',
    'Sara',
    'Mel',
    'Steve',
];

//* Получение элементов со страницы
let fragment = document.createDocumentFragment();
let pictureContainer = document.querySelector('.pictures');
let bigPicture = document.querySelector('.big-picture');

let pictureTamplate = document.querySelector('#picture').content;
let picturesContainer = document.querySelector('.pictures');
let pictureClose = document.querySelector('#picture-cancel');

let uploadImage = pictureContainer.querySelector('#upload-file');
let imageSettings = pictureContainer.querySelector('.img-upload__overlay');
let uploadCancel = pictureContainer.querySelector('#upload-cancel');
let resizeControlMinus = picturesContainer.querySelector('.resize__control--minus');
let resizeControlPlus = picturesContainer.querySelector('.resize__control--plus');
let resizeControlValue = picturesContainer.querySelector('.resize__control--value');
let imageUpLoadPreview = pictureContainer.querySelector('.img-upload__preview');
let imageUpLoadPreviewImg = imageUpLoadPreview.querySelector('img');
let effectsList = pictureContainer.querySelector('.effects__list');
let imageUploadScale = document.querySelector('.img-upload__scale');
let scalePin = imageUploadScale.querySelector('.scale__pin');
let scaleLine = imageUploadScale.querySelector('.scale__line');
let scaleValue = imageUploadScale.querySelector('.scale__value');
const SCALE = {
    min: 25,
    max: 100,
    step: 25
};


//* Получение рандомного индекса
let getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//* Получение рандомого элемента из массива
let getRandomArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

//* Генерация рандомного коммента
let generateRandomComment = function(source) {
    let comments = [];
    let commentsQuantity = getRandomNum(1, source.length);
    let commentsLength = getRandomNum(1, 2);
    for (let i = 1; i < commentsQuantity; i++) {
        comments[i] = '';
        for (let j = 1; j < commentsLength; j++) {
            comments[i] = getRandomArr(source);
        }
    }
    return comments;
};

//* Создает рандомные данные фотографии
let generatePictureData = function(pictureIndex) {
    return {
        url: `photos/${pictureIndex}.jpg`,
        likes: getRandomNum(LIKES.min, LIKES.max),
        comment: generateRandomComment(COMMENTS),
        description: getRandomArr(DESCRIPTION)
        // name: getRandomArr(names)
    }
};

//* Cоздает нужное количество фотографий и данных о фотографиях
let generatePicturePreview = function(pictureQuantity) {
    let picturesItem = [];
    for (let i = 1; i <= pictureQuantity; i++) {
        picturesItem[i] = generatePictureData(i);
    }
    return picturesItem;
};

let pictures = generatePicturePreview(QUANTITY_PICTURES);

//* Отрисовка нужного количества привью фотографий
function renderPictures() {
    for (let i = 1; i < QUANTITY_PICTURES; i++) {
        fragment.appendChild(generatePictures(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
}

//* Отрисовка привью фотографий
renderPictures();

//* Подставление сгенерированных данных о фотографии на страницу
let generatePicturesInfo = function(picturesItem) {
    //* Клубокое клонирование cloneNode
    let previewElement = pictureTamplate.querySelector('.picture__link').cloneNode(true);
    //* подставление данных
    previewElement.querySelector('.picture__img').src = picturesItem.url;
    previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comment;
    previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
    return previewElement;
};

//* Показывает большое фото
let showBigPicture = function(picture) {
    let commentsContainer = bigPicture.querySelector('.social__comments');
    let commentTemplate = bigPicture.querySelector('.social__comment');

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comment.length;

    commentsContainer.innerHTML = '';
    let commentsFragment = document.createDocumentFragment();
    for (let i = 0; i < picture.comment.length; i++) {
        commentTemplate.querySelector('.social__picture').src = `img/avatar-${getRandomNum(1, AVATARS)}.svg`
        commentTemplate.querySelector('.social__text').textContent = picture.comment[i];
        commentTemplate.appendChild(commentTemplate.cloneNode(true));
    }
    commentsContainer.appendChild(commentsFragment);

    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

//* Закрывает большое фото при нажатии на клавишу ESC
function onBigPhotoEscPress(e) {
    if (e.keyCode === ESC_KEYCODE) {
        e.preventDefault();
        closeBigPhoto();
    }
}

//* Закрывает окна при нажатии клавиши когда в фокусе кнопка закрытия
function closeBigPhoto() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
}

//* Функция открытия блока « #upload-file »
function onSettingsPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        closeSettings();
    }
}

//* Открытие окна закрузки и редактирования фотографии
function openSettings() {
    imageSettings.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsPopupEscPress);
}

//* Закрытие окна загрузки
function closeSettings() {
    imageSettings.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsPopupEscPress);
    uploadImage.value = '';
    resizeControlValue.value = '55%';
    imageUpLoadPreview.style.transform = '';
    imageUpLoadPreview.className = '';
}

//* Открытие окна загрузки фото и редактирования
uploadImage.addEventListener('change', () => {
    openSettings();
});

//* Закрытие окна загрузки и редактирования 
uploadCancel.addEventListener('click', () => {
    closeSettings();
});

//* Закрытие окна загрузки при фокусе кнопки закрыть и нажатии на ENTER
uploadCancel.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
        closeSettings();
    }
});

//* Функция управлением размера загружаемого изображения
function resizeImage(sign) {
    let controlValue = resizeControlValue.value;
    controlValue = parseInt(controlValue, 10) - SCALE.step * sign;
    if (controlValue > SCALE.max) {
        controlValue = SCALE.max;
    } else if (controlValue < SCALE.min) {
        controlValue = SCALE.min;
    }
    controlValue += '%';
    resizeControlValue.value = controlValue;
    imageUpLoadPreview.style.transform = `scale(${(parseInt(controlValue, 10) / 100)})`;
}

//* Увеличение загружаемого изображения на +25% при клике на « + »
resizeControlMinus.addEventListener('click', () => {
    resizeImage(1);
});

//* Уменьшение загружаемого изображения на -25% при клике на « - »
resizeControlPlus.addEventListener('click', () => {
    resizeImage(-1);
});

//* Функция для отслеживания управления размером изображения
function getPersentPositionLeft(targetElem, parentElem) {
    return (targetElem.offsetLeft / parentElem.offsetWidth).toFixed(2);
}

//*
scalePin.addEventListener('mouseup', () => {
    let pinPosition = getPersentPositionLeft(scalePin, scaleLine);
    let effectName = effectsList.querySelector('.effects__radio').checked.value;
    let effect = '';
    scaleValue.setAttribute('value', Math.floor(pinPosition));
    if (effectName === 'chrome') {
        effect = `grayscale(${pinPosition})`;
    } else if (effectName === 'sepia') {
        effect = `sepia(${pinPosition})`
    } else if (effectName === 'marvin') {
        effect = `invert((${pinPosition * 100})%)`;
    } else if (effectName === 'phobos') {
        effect = `blur((${(pinPosition * 3)}.${toFixed(2)}px)`;
    } else if (effectName === 'heat') {
        effect = `brightness(${(pinPosition * 3)}.${toFixed(2)})`;
    }
    imageUpLoadPreviewImg.style.filter = effect;
});

//TODO Добавить Влидацию хец-тегов

//* Выбор еффекта для фотографии при помощи удаления и добвления класса
effectsList.addEventListener('change', (evt) => {
    var effectName = evt.target.value;
    if (effectName === 'none') {
        imageUploadScale.classList.add('hidden');
    } else {
        imageUploadScale.classList.remove('hidden');
    }
    imageUpLoadPreviewImg.className = '';
    imageUpLoadPreviewImg.style = '';
    imageUpLoadPreviewImg.classList.add(`effects__preview--${effectName}`);
});


//* Генерация контента на выбраной фотографии
function generatePictures(picturesItem) {
    let previewElement = pictureTamplate.querySelector('.picture__link').cloneNode(true);
    previewElement.querySelector('.picture__img').src = picturesItem.url;
    previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
    previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comment.length;
    previewElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPicture(picturesItem);
        document.addEventListener('keydown', onBigPhotoEscPress);
    });
    return previewElement;
}

//* Закрытие большой фотографии
pictureClose.addEventListener('click', () => {
    closeBigPhoto();
});

//* Закрытие большой фотографии при на жатии на ENTER при фокусе на кнопке закрытия
pictureClose.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
        closeBigPhoto();
    }
});

