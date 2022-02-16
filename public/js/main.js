const certBtn = document.querySelectorAll('.cert-btn');
const certImage = document.querySelectorAll('.cert-image');

certBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        certImage.forEach((image) => {
            if(image === certImage[index]) {
                return
            }
            image.classList.remove('active');
        });
        if(certImage[index].classList.contains('active')) {
            certImage[index].classList.remove('active');
        } else {
            certImage[index].classList.add('active');
        }
    });
});