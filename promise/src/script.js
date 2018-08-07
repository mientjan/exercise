/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise <any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement("img");
    img.onload = function() {
        resolve(this);
    };
    img.onerror = function(e) {
        reject(e);
    };
    img.src = url;
  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y) {
  return new Promise(function(resolve) {
      TweenLite.to(element, duration, {x: x, y: y, onComplete: resolve});
  });
}

let imagesUrls = [
    "./assets/001-yawn.png",
    "./assets/002-wink.png",
    "./assets/003-smile-1.png",
    "./assets/004-smile.png",
    "./assets/005-surprise.png",
    "./assets/006-shocked.png",
    "./assets/007-sceptic.png",
    "./assets/008-sad-2.png",
    "./assets/009-sad-1.png",
    "./assets/010-happy-3.png",
    "./assets/011-pain.png",
    // "./assets/012-muted.png",
    // "./assets/013-meh.png",
    // "./assets/014-laugh.png",
    // "./assets/015-ill.png",
    // "./assets/016-happy-2.png",
    // "./assets/017-happy-1.png",
    // "./assets/018-cute.png",
    // "./assets/019-crying.png",
    // "./assets/020-crazy.png",
    // "./assets/021-cool.png",
    // "./assets/022-bored.png",
    // "./assets/023-blush.png",
    // "./assets/024-sad.png",
    // "./assets/025-happy.png"
];

/// WRITE CODE UNDER HERE

/**
 * Fades in an element to the page
 * @param {Element} element
 * @param {number} duration
 * @return {Promise <any>}
 */
function fadeIn(element, duration) {
    return new Promise(function(resolve) {
        TweenLite.to(element, duration, {opacity: 1, onComplete: resolve});
    });
}

/**
 * Colors the background of a element to the page
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {string} color, the color for the background
 * @return {Promise <any>}
 */
function colorImage(element, duration, color) {
    return new Promise(function(resolve) {
        TweenLite.to(element, duration, {background: color, onComplete: resolve});
    });
}

/**
 * Append an element to a container
 * @param {HTMLElement} element, the element to be appended
 * @param {string} container, the element in which to append
 * @param {string} className, a string with the className for the appended element
 * @return {Promise <any>}
 */
function appendWithClassName(element, container, className) {
    return new Promise(function(resolve) {
        document.querySelector(container).appendChild(element);
        element.className = className;
        resolve();
    });
}

let imagesIndex = 0;

function checkLoop() {
    return new Promise(function(resolve) {
        imagesIndex++;
        if (imagesIndex === successArray.length) {
            let finishedDiv = document.querySelector(".finishedDiv");
            fadeIn(finishedDiv, 3).then(() => resolve());
        } else {
            animationLoop(.25);
        }
    });
}


/**
 * loadImages loads recursively an array of images
 * @param arr, an array containing URLs for images
 * @return {Promise <any>}
 */
let successArray = [];


function loadImages(arr) {
    let promiseArray = [];
    arr.forEach(elem => {
        var prom = loadImage(elem)
            .then(elem => {
                successArray.push(elem);
                return appendWithClassName(elem, ".imagesContainer", "face").then(() => {
                    return elem;
                });
            }, err => {
                return null;
            });

        promiseArray.push(prom);

    });

    return Promise.all(promiseArray);

    // });
}

function animationLoop(animationDuration) {
    console.log("animating a single image...");
    let currentImage = successArray[imagesIndex];
    let currentImageProperties = currentImage.getBoundingClientRect();

    let containerProperties = document.querySelector('.imagesContainer').getBoundingClientRect();
    let containerTop = 0;
    let containerLeft = 0;
    let containerRight = (containerProperties.width - currentImageProperties.left) + "px";
    let containerBottom = (containerProperties.height - currentImageProperties.height + containerProperties.top - currentImageProperties.top) + "px";

    colorImage(currentImage, animationDuration, "yellow")
        .then(() => animate(currentImage, animationDuration, containerRight, containerTop))
        .then(() => animate(currentImage, animationDuration, containerRight, containerBottom))
        .then(() => animate(currentImage, animationDuration, containerLeft, containerBottom))
        .then(() => animate(currentImage, animationDuration, containerLeft, containerTop))
        .then(() => colorImage(currentImage, animationDuration, "green"))
        .then(() => checkLoop());
}

loadImages(imagesUrls).then(() => animationLoop(.25));