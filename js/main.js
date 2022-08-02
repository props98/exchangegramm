"use strict";

const QUANTITY_PICTURES = 25;

const LIKES = {
    min: 15,
    max: 200
};

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
let pictureTamplate = document.querySelector('#picture').content;
let bigPicture = document.querySelector('.big-picture');

//* Получение рандомного индекса
let getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//* Получение рандомого элемента из массива
let getRandomArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

//* Создаем данные фотографии
let generatePictureData = function(pictureIndex) {
    return {
        url: `photos/${pictureIndex}.jpg`,
        likes: getRandomNum(LIKES.min, LIKES.max),
        comment: getRandomArr(COMMENTS),
        description: getRandomArr(DESCRIPTION),
        name: getRandomArr(names)
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

// console.log(pictures[1]);
// console.log(pictures);

//* Выводим данные о фотографии на страницу
let generatePicturesInfo = function(picturesItem) {
    let previewElement = pictureTamplate.querySelector('.picture__link').cloneNode(true);
    previewElement.querySelector('.picture__img').src = picturesItem.url;
    previewElement.querySelector('.picture__stat--comments').textContent = picturesItem.comment;
    previewElement.querySelector('.picture__stat--likes').textContent = picturesItem.likes;
    return previewElement;
};

//* Добовляем фото на страницу
let renderPictures = function() {
    for (let i = 1; i <= QUANTITY_PICTURES; i++) {
        fragment.appendChild(generatePicturesInfo(pictures[i]));
    }
    pictureContainer.appendChild(fragment);
};

renderPictures();

