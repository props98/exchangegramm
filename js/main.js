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

//* Создаем рандомные данные фотографии
let generatePictureData = function(pictureIndex) {
    return {
        url: `photos/${pictureIndex}.jpg`,
        likes: getRandomNum(LIKES.min, LIKES.max),
        comment: generateRandomComment(COMMENTS),
        description: getRandomArr(DESCRIPTION)
        // name: getRandomArr(names)
    }
};

//* Cоздаем нужное количество фотографий и данных о фотографиях
let generatePicturePreview = function(pictureQuantity) {
    let picturesItem = [];
    for (let i = 1; i <= pictureQuantity; i++) {
        picturesItem[i] = generatePictureData(i);
    }
    return picturesItem;
};


let pictures = generatePicturePreview(QUANTITY_PICTURES);

// console.log(pictures[1].comment.length);
// pictures.forEach(picture => {
//     console.log(picture.url);
// });


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

function onBigPhotoEscPress(e) {
    if (e.keyCode === ESC_KEYCODE) {
        e.preventDefault();
        closeBigPhoto();
    }
}

//* Закрытие окна при нажатии клавиши или крестика
function closeBigPhoto() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
}

//* Редактирования фото « #upload-file »
function onSettingsPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        closeSettings();
    }
}

function openSettings() {
    imageSettings.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsPopupEscPress);
}

function closeSettings() {
    imageSettings.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsPopupEscPress);
    uploadImage.value = '';
    resizeControlValue.value = '55%';
    imageUpLoadPreview.style.transform = '';
    imageUpLoadPreview.className = '';
}

//* Открытие и Закрытие настроек редоктирования фото при нажатии на закрузить фото
uploadImage.addEventListener('change', () => {
    openSettings();
});

uploadCancel.addEventListener('click', () => {
    closeSettings();
});

//* Закрытие при фокусе на иконке «закрыть» и нажитии на клавишу Enter
uploadCancel.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
        closeSettings();
    }
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

function renderPictures() {
    for (let i = 1; i < QUANTITY_PICTURES; i++) {
        fragment.appendChild(generatePictures(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
}

renderPictures();

pictureClose.addEventListener('click', () => {
    closeBigPhoto();
});

pictureClose.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
        closeBigPhoto();
    }
});

