"use strict";

const QUANTITY_PICTURES = 25;

const LIKES = {
    min: 15,
    max: 200
};

const AVATARS = 6;

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

//* Добавляем фото с сгенерированными данными на страницу
let renderPictures = function() {
    for (let i = 1; i <= QUANTITY_PICTURES; i++) {
        fragment.appendChild(generatePicturesInfo(pictures[i]));
    }
    pictureContainer.appendChild(fragment);
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

renderPictures();
showBigPicture(pictures[10]);