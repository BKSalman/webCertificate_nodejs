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

// const deleteModal = document.querySelector('.delete-modal');

// const deleteBtn = document.querySelector('.delete-btn')?.addEventListener('click', () => {
//     const deleteModal = document.querySelector('.delete-modal');
//     deleteModal.classList.toggle('active-modal');
    
// });

// const closeDeleteModal = (e) => {
//     if(e.target.classList.contains('delete-modal')) {
//         deleteModal.classList.remove('active-modal');
//     }
// }

const openDeleteModalButton = document.querySelectorAll('[data-modal-target]');
const closeDeleteModalButton = document.querySelectorAll('[data-dismiss-modal]');
const overlay = document.getElementById('overlay');

openDeleteModalButton.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

closeDeleteModalButton.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.delete-modal');
        closeModal(modal);
    });
});

overlay?.addEventListener('click',() => {
    const modals = document.querySelectorAll('.delete-modal.active');
    modals.forEach((modal) => {
        closeModal(modal);
    });
});

const openModal = (modal) => {
    if(!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

const closeModal = (modal) => {
    if(!modal) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

const confirmDelete = (e) => {
    const participantId = e.target.dataset.participantId;
    
    axios
    .post(`/participant/delete/${participantId}`).then((res) => {
            const modal = e.target.closest('.delete-modal');
            closeModal(modal);
            window.location.href = '/admin';
        }).catch((err) => {
            console.log(err);
        }
    );
};

const formModal = document.querySelector('.form-modal');
const formModalBtn = document.getElementById('form-modal-btn');

formModalBtn?.addEventListener('click', () => {
    formModal.classList.toggle('active');
});

const addParticipant = (e) => {
    e.preventDefault();
    const form = document.querySelector('.admin-add');
    const data = new FormData(form).values();

    const Pre = data.next()
    const Id = data.next()
    const Name = data.next()
    const Email = data.next()
    const Professional = data.next()
    const Informative = data.next()
    const Visually = data.next()

    axios
    .post(`/certificate`, {
        Pre:Pre.value,
        Id:Id.value,
        Name:Name.value,
        Email:Email.value,
        Professional:Professional.value,
        Informative:Informative.value,
        Visually:Visually.value,
        }).then((res) => {
        window.location.href = '/admin';
    }).catch((err) => {
        console.log(err);
    });

};

const adminLogin = (e) => {
    e.preventDefault();
    const form = document.querySelector('.admin-login');
    const data = new FormData(form).values();

    const username = data.next().value
    const password = data.next().value
    console.log(username, password);
    axios
    .post(`/admin/login`, {
        username:username,
        password:password,
        }).then((res) => {
        // window.location.href = '/admin';
        console.log("login");
    }).catch((err) => {
        console.log(err);
    });
}
