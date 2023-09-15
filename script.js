const choosePhotoButton = document.getElementById('choose-photo-button');
const choosePhoto = document.getElementById('choose-photo');
const imageContainer = document.querySelector('.image-container');
const originalImage = document.getElementById('original-image');
const previewImage = document.getElementById('preview-image');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const previewButton = document.getElementById('preview-button');
const downloadButton = document.getElementById('download-button');

let uploadedImage = null;

choosePhotoButton.addEventListener('click', function() {
    choosePhoto.click(); // Trigger the file input
});

choosePhoto.addEventListener('change', function() {
    const file = choosePhoto.files[0];
    if (file) {
        uploadedImage = URL.createObjectURL(file);
        originalImage.src = uploadedImage;
        imageContainer.style.display = 'block'; // Show the image container
        previewImage.src = ''; // Clear the previous preview image
        previewImage.style.display = 'none'; // Hide the preview image
        downloadButton.style.display = 'none'; // Hide the download button
    }
});

previewButton.addEventListener('click', function() {
    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);

    if (isNaN(newWidth) || isNaN(newHeight)) {
        alert('Please enter valid width and height.');
        return;
    }

    if (uploadedImage) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();

        image.onload = function() {
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
            const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
            previewImage.src = resizedImage;
            previewImage.style.display = 'block'; // Show the preview image
            downloadButton.href = resizedImage;
            downloadButton.style.display = 'block';
        };

        image.src = uploadedImage;
    } else {
        alert('Please choose an image to resize.');
    }
});