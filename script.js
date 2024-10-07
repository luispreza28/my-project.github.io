// Global variable to keep track of the current card
var currentCard = null;

function showImage(sliderId, index) {
    const container = document.getElementById(sliderId);
    const slides = container.getElementsByClassName('slide');
    Array.from(slides).forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage(sliderId) {
    const container = document.getElementById(sliderId);
    const slides = container.getElementsByClassName('slide');
    let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
}

function prevImage(sliderId) {
    const container = document.getElementById(sliderId);
    const slides = container.getElementsByClassName('slide');
    let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].style.display = 'block';
}

function openModal(modalIndex, imageSrc, altText) {
    var modals = document.getElementsByClassName("modal");
    var modal = modals[modalIndex];
    var modalImg = modal.querySelector(".modal-content");
    var captionText = modal.querySelector(".caption");
    var sliderContainer = document.getElementById('slider' + (modalIndex + 1));

    currentSliderImages = Array.from(sliderContainer.getElementsByClassName('slide'));

    currentImageIndex = currentSliderImages.findIndex(img => img.src === imageSrc);

    modalImg.src = imageSrc;
    captionText.innerHTML = altText;

    modal.style.display = "block";

    currentCard = event.target.closest('.card');
    if (currentCard) {
        currentCard.classList.remove('card-hover');
    }
}

function closeModal(modal) {
    modal.style.display = "none";
    if (currentCard) {
        currentCard.classList.add('card-hover');
    }
    currentCard = null;
}

// Event listener for close buttons
document.querySelectorAll(".close").forEach(btn => {
    btn.onclick = function(event) {
        closeModal(event.target.closest('.modal'));
    }
});

// Close modal on clicking outside of the image
document.querySelectorAll(".modal").forEach(modal => {
    modal.onclick = function(event) {
        var modalImg = modal.querySelector(".modal-content");
        if (event.target !== modalImg) {
            closeModal(modal);
        }
    }
});

// Initialize sliders
document.querySelectorAll('.image-container').forEach(container => {
    const slides = container.getElementsByClassName('slide');
    if (slides.length > 0) {
        slides[0].style.display = 'block';
    }
});

function showNextImage(modalIndex) {
    currentImageIndex = (currentIndex + 1) % currentSliderImages.length;
    updateModalImage(modalIndex);
}

function showPrevImage(modalIndex) {
    currentImageIndex = (currentIndex - 1 + currentSliderImages.length) % currentSliderImages.length
    updateModalImage(modalIndex);
}

function updateModalImage(modalIndex) {
    var modal = document.getElementByClassName("modal")[modalIndex];
    var modalImg = modal.querySelector(".modal-content");
    var captionText = modal.querySelector('.caption');

    var currentImage = currentSliderImages[currentImageIndex];

    modalImg.src = currentImage.src;
    captionText.innerHTML = currentImage.alt;

}


