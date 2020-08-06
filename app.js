$(document).ready(() => {


    const imageArr = ['./img/angular.svg', './img/aurelia.svg', './img/backbone.svg', './img/ember.svg', './img/react.svg', './img/vue.svg'];
    const imageNodeList = $('.backside');
    const tiles = $('.tile');
    const scoreLabel = $('#total-score');
    let score = 0;

    /* ----------------------------------------------------------------- */

    // Generate random array of length 12 and values from 1 to 6 and assign data-value attributes to the div's holding the images

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

    const randomIndexArr = randomIndexArrayGenerator();

    $.each(imageNodeList, (index, element) => {
        $(element).attr('src', imageArr[randomIndexArr[index] - 1]);
        $(element).parent().attr('data-value', randomIndexArr[index] - 1);
    })

    /* ----------------------------------------------------------------- */

    // Function to get a key with a particular value

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    /* ----------------------------------------------------------------- */

    // Function to reveal and hide tiles

    function flipTile(tileElement, revealOrHide) {
        if (revealOrHide === 'reveal') {
            return function () {
                tileElement.addClass('tile-animation');
                tileElement.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                    tileElement.children().last().css('visibility', 'hidden');
                    tileElement.children().first().css('visibility', 'visible');
                    tileElement.removeClass('tile-animation');
                });
            }
        } else {
            return function () {
                tileElement.addClass('tile-animation');
                tileElement.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                    tileElement.children().last().css('visibility', 'visible');
                    tileElement.children().first().css('visibility', 'hidden');
                    tileElement.removeClass('tile-animation');
                });
            }
        }
    }

    /* ----------------------------------------------------------------- */

    // Function to make tiles dissapear when matched

    function tileMatched(tileElement) {
        score++;
        isACardFlipped = false;
        flippedID = "0";
        setTimeout(() => {
            $(`[data-value=${tileElement.attr('data-value')}]`).addClass('tile-remove');
            scoreLabel.html(score);
            $('.disable-screen').css('visibility', 'hidden');
        }, 1200);

    }

    /* ----------------------------------------------------------------- */

    // Function to flip tiles over when not matched

    function tileNotMatched(tileElement) {

        const currentElement = tileElement;
        const prevElement = $(`#${flippedID}`);

        statusObj[prevElement.attr('data-value')] = false;
        setTimeout(() => {

            (flipTile(currentElement, 'hide'))();
            (flipTile(prevElement, 'hide'))();
            $('.disable-screen').css('visibility', 'hidden');

        }, 1200);
        isACardFlipped = false;
        flippedID = "0";

    }

    /* ----------------------------------------------------------------- */

    // Create a status object to hold info regarding which tile was turned over

    const statusObj = {
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
    }

    // Store info whether a card is turned over and if it is, it's ID.

    let isACardFlipped = false;
    let flippedID = "0";

    /* ----------------------------------------------------------------- */

    // Add click event listeners to all tiles

    $.each(tiles, (index, tile) => {
        $(tile).click(() => {

            (flipTile($(tile), 'reveal'))();

            // Condition statement based on the whether any previous tile was flipped

            if (!isACardFlipped) { // No previous tile was flipped
                statusObj[$(tile).attr('data-value')] = true;
                isACardFlipped = true;
                flippedID = $(tile).attr('id');
            } else {
                if (statusObj[$(tile).attr('data-value')]) { // The previous tile flipped matches the current card that is flipped
                    $('.disable-screen').css('visibility', 'visible'); // Enable screen to prevent clicking
                    tileMatched($(tile));
                } else { // The previous tile flipped does not match the current card
                    $('.disable-screen').css('visibility', 'visible'); // Enable screen to prevent clicking
                    tileNotMatched($(tile));
                }
            }

        });
    });
    /* ----------------------------------------------------------------- */


    console.log(localStorage)
})