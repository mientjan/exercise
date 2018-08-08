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
    // "./assets/005-surprise.png",
    // "./assets/006-shocked.png",
    // "./assets/007-sceptic.png",
    // "./assets/008-sad-2.png",
    // "./assets/009-sad-1.png",
    // "./assets/010-happy-3.png",
    // "./assets/011-pain.png",
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


let promisesArray = [];

imagesUrls.forEach(image => {
    promisesArray.push(loadImage(image));
});


console.log("promisesArray", promisesArray);

Promise.all(promisesArray).then(imagesArray => {

    console.log("images array", imagesArray);

    imagesArray.forEach(currentImage => {
        currentImage.className = "face";
        document.querySelector(".imagesContainer").appendChild(currentImage);
    });

    let result = imagesArray.reduce((previousValue, currentValue) => {
        return previousValue
            .then(() => animate(currentValue, 1, 100, 0))
            .then(() => animate(currentValue, 1, 100, 100))
            .then(() => animate(currentValue, 1, 0, 100))
            .then(() => animate(currentValue, 1, 0, 0))
            .then(() => console.log("ssfs"))
    }, Promise.resolve([]).then(
        console.log("aaaaa")
    ));

});


/*
let allImagesFinishedPromise = Promise.all(promisesArray);

let promise = allImagesFinishedPromise.then(images => {

    // Appending all images to dom
    images.forEach(currentImage => {
        currentImage.className = "face";
        document.querySelector(".imagesContainer").appendChild(currentImage);
    });

    function animateNextImage(index) {
        console.log(index);
        let currentImage = images[index];

        return new Promise(function(resolve) {
            return animate(currentImage, 1, 100, 0)
                .then(() => {
                    return animate(currentImage, 1, 100, 100);
                })
                .then(() => {
                    return animate(currentImage, 1, 0, 100);
                })
                .then(() => {
                    return animate(currentImage, 1, 0, 0);
                })
                .then(() => {
                    resolve();
                })
        });

    }

    images.map((value, index) => {
        animateNextImage(index);
    });
});

/*

 /*
let allImagesLoadedPromise = Promise.all(promisesArray);

allImagesLoadedPromise.then(images => {
    console.log(images);

    images.forEach(image => {
        image.className = "face";
        document.querySelector(".imagesContainer").appendChild(image);
    });




    function animateSingleImage(img){
        console.log("img: ", img);
        let currentImage = img;

        let prom = animate(currentImage, 1, 10, 0)
            .then(() => {
                return animate(currentImage, 1, 10, 10).then(() => {
                    return animate(currentImage, 1, 0, 10).then(() => {
                        return animate(currentImage, 1, 0, 0).then(() => {
                            return currentImage;
                        });
                    });
                });
            }, err => {
                let divError = document.createElement("div");
                return appendWithClassName(divError, ".errorsContainer", "error").then(() => {
                    divError.setAttribute("wrongUrl", err.path[0].currentSrc);
                    return err;
                });
            });
    }

    images.map((value, index) => {
        console.log(value, index);
        animateSingleImage(value);
    })


});
*/

/*
Promise.all(promisesArray).then((result) => {
    console.log(result);
    console.log(result.length);
    result.map(function(currentValue, index, array) {
        return appendWithClassName(currentValue, ".imagesContainer", "face");
    });
});



console.log(new_array);

/*
Promise.all(promisesArray.map((promise, index) => {
    console.log(promise);
    console.log(index);
    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(index * 2), 1000);
    });
}))


/*
    new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});

/*
Promise.all(promisesArray).then((result) => {
    console.log(result);
    console.log(result.length);

    result.map(function(singleImage, i) {
        return appendWithClassName(result[i], ".imagesContainer", "face").then(() => {
            return colorImage(result[i], 1, "yellow")
                .then(() => {return animate(result[i], 1, 10, 0)})
                .then(() => {return animate(result[i], 1, 10, 10)})
                .then(() => {return animate(result[i], 1, 0, 10)})
                .then(() => {return animate(result[i], 1, 0, 0)})
                .then(() => {return colorImage(result[i], 1, "green")})
        })
    });

});


*/

// let allImagesFinishedPromise = Promise.all(promisesArray);


/*

Promise.all(promisesArray.map(function(promise) {
    return promise.resolve().then(image => {
        console.log(image);
    });
}))


allImagesFinishedPromise.then(images => {
        console.log(images);
        images.map(function(singleImage, index) {
            console.log(index);
            console.log(singleImage);
            return appendWithClassName(singleImage, ".imagesContainer", "face").then(() => {
                return colorImage(singleImage, 1, "red");
            })
        });
    }
);
*/

/*
Promise.all(promisesArray.map(prom => {
    console.log(prom);
    return prom.then(image => {
        return appendWithClassName(image, ".imagesContainer", "face").then(() => {
            return animate(image, 1, 100, 100);
        })
    })
})).then(() => {
    console.log("finished");
});

*/

/*
Promise.all(promisesArray).then((result) => {
    result.map(function(image) {
        appendWithClassName(image, ".imagesContainer", "face").then(() => {
            animate(image, 1, 100, 100)
        })
        //return animate(image, 1, 100, 100);
    });
});
*/

/*
console.log("imagesUrls: ", imagesUrls);
loadImage(image).then((elem) => {
    appendWithClassName(elem, ".imagesContainer", "face").then(() => {
        colorImage(elem, 1, "yellow")
            .then(() => animate(elem, 1, 100, 0))
            .then(() => animate(elem, 1, 100, 100))
            .then(() => animate(elem, 1, 0, 100))
            .then(() => animate(elem, 1, 0, 0))
            .then(() => colorImage(elem, 1, "green"))
            .then(() => imagesUrls.shift())
    })
})
*/




/*
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

*/
/**
 * loadAndAppendImages loads recursively an array of images
 * @param arr, an array containing URLs for images
 * @return {Promise <any>}
 */
/*
function loadAndAppendImages(arr) {
    let promiseArray = [];
    //let successArray = [];

    arr.forEach(elem => {
        let prom = loadImage(elem)
            .then(elem => {
                //successArray.push(elem);
                return appendWithClassName(elem, ".imagesContainer", "face").then(() => {
                    return elem;
                });
            }, err => {
                let divError = document.createElement("div");
                return appendWithClassName(divError, ".errorsContainer", "error").then(() => {
                    divError.setAttribute("wrongUrl", err.path[0].currentSrc);
                    return err;
                });
            });
        promiseArray.push(prom);
    });

    //return Promise.all(promiseArray);

    return Promise.all(promiseArray.map(function(singlePromise){
        console.log("singlePromise: ", singlePromise);
    }))
        .then(result => console.log("bbb", result));


}

function animationLoop(elem, animationDuration) {
    console.log("animating a single image...");
    let currentImage = elem;
    console.log("elem: ", elem);
    let currentImageProperties = currentImage.getBoundingClientRect();

    let containerProperties = document.querySelector('.imagesContainer').getBoundingClientRect();
    let containerTop = 0;
    let containerLeft = 0;
    let containerRight = containerProperties.width - currentImageProperties.left;
    let containerBottom = containerProperties.height - currentImageProperties.height + containerProperties.top - currentImageProperties.top;

    colorImage(currentImage, animationDuration, "yellow")
        .then(() => animate(currentImage, animationDuration, containerRight, containerTop))
        .then(() => animate(currentImage, animationDuration, containerRight, containerBottom))
        .then(() => animate(currentImage, animationDuration, containerLeft, containerBottom))
        .then(() => animate(currentImage, animationDuration, containerLeft, containerTop))
        .then(() => colorImage(currentImage, animationDuration, "green"))
        .then(() => checkLoop());
}
*/
// loadAndAppendImages(imagesUrls).then(() => animationLoop(.25));
//loadAndAppendImages(imagesUrls);

// imagesUrls.forEach(img => {
//     loadImage(img).then(test => {
//         console.log("test", test);
//     });
// })