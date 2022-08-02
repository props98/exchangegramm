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

const DESCRIPTION = [];

let names = [
    'Jhon',
    'Mike',
    'April',
    'Sara',
    'Mka',
    'Steve',
];

let fragment = document.createDocumentFragment();
let pictureContainer = document.querySelector('#picture').content;
let pictureTemplate = document.querySelector('.pictures');
let bigPicture = document.querySelector('.big-picture');

//* Получение рандомного индекса
let randomIndex = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//* Получение рандомого элемента из массива
let randomArrElem = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};