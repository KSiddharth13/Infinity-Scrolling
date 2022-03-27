const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isinitialised = true;

// Unsplash API
let initialCount = 5;
const apiKey = `o9Gb9l_n5RMPD-wM-F1ge92Gra4HKsZ6F9CFCt0GKQ8`;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// Update API with new count
function updateApiWithNewCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function on set attributes to DOM Elements
function setAttributes(element, attribute){
    for(const key in attribute){
        element.setAttribute(key, attribute[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            target: photo.alt_description
        });

        // Event Listener, Check when each is finished loading
        img.addEventListener('load',imageLoaded);

        // Put the <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isinitialised){
            updateApiWithNewCount(30);
            isinitialised = false; 
        }
    } catch(error) {
        window.alert(error);
    }
}

// Check to see if scrolling near bottom of Page, Load more photos
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -  1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();