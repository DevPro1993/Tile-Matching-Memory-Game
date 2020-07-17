$(document).ready(() => {


    const imageArr = ['./img/angular.svg', './img/aurelia.svg', './img/backbone.svg', './img/ember.svg', './img/react.svg', './img/vue.svg'];
    const imageNodeList = $('.backside');
    const tiles = $('.tile');
    const randomIndexArr = randomIndexArrayGenerator();

    const scoreLabel = $('#total-score');

    let score = 0;



    function randomIndexArrayGenerator() {
        const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 1; i <= 6; i++) {
            for (let j = 1; j <= 2; j++) {
                let randomIndex = Math.floor(Math.random() * 12);
                while (arr[randomIndex] !== 0) {
                    randomIndex = Math.floor(Math.random() * 12);
                }
                arr[randomIndex] = i;
            }
        }
        return arr;
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function tileMatched(tileElement) {
        score++;
        
        isACardFlipped = false;
        flippedID = "0";
        setTimeout(() => {
            $(`[data-value=${tileElement.attr('data-value')}]`).addClass('tile-remove');
            scoreLabel.html(score);
        }, 1500)
    }

    function tileNotMatched(tileElement) {

        const currentElement = tileElement;
        const prevElement = $(`#${flippedID}`);

        statusObj[prevElement.attr('data-value')] = false;


        setTimeout(() => {

            currentElement.addClass('tile-animation');
            currentElement.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                currentElement.children().last().css('visibility', 'visible');
                currentElement.children().first().css('visibility', 'hidden');
                currentElement.removeClass('tile-animation');
            });

            prevElement.addClass('tile-animation');
            prevElement.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                prevElement.children().last().css('visibility', 'visible');
                prevElement.children().first().css('visibility', 'hidden');
                prevElement.removeClass('tile-animation');
            });

        }, 1500);

        isACardFlipped = false;
        flippedID = "0";

    }




    $.each(imageNodeList, (index, element) => {
        $(element).attr('src', imageArr[randomIndexArr[index] - 1]);
        $(element).parent().attr('data-value', randomIndexArr[index] - 1);
    })



    const statusObj = {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
    }

    let isACardFlipped = false;
    let flippedID = "0";



    // Adding event listeners to all tiles

    $.each(tiles, (index, tile) => {
        $(tile).click(() => {

            // Adding tile flipping animation

            $(tile).addClass('tile-animation');
            $(tile).on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                $(tile).children().last().css('visibility', 'hidden');
                $(tile).children().first().css('visibility', 'visible');
                $(tile).removeClass('tile-animation');
            });


            if (!isACardFlipped) {
                statusObj[$(tile).attr('data-value')] = true;
                isACardFlipped = true;
                flippedID = $(tile).attr('id');
            } else {
                if (statusObj[$(tile).attr('data-value')]) {
                    tileMatched($(tile));
                } else {
                    tileNotMatched($(tile));
                }
            }

        });
    });





})