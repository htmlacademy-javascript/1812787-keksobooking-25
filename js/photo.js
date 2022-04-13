const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.getElementById('avatar');
const avatarPreview = document.getElementById('header__preview');
const housePhotoChooser = document.getElementById('images');

avatarChooser.addEventListener('change', () => {
  const fileAvatar = avatarChooser.files[0];
  const fileAvatarName = fileAvatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileAvatarName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(fileAvatar);
  }
});

housePhotoChooser.addEventListener('change', () => {
  const filePhoto = housePhotoChooser.files[0];
  const filePhotoName = filePhoto.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => filePhotoName.endsWith(it));

  if (matches) {
    let photoPreview = document.getElementById('photo_preview');
    if (!(photoPreview)) {
      photoPreview = document.createElement('img');
    }
    photoPreview.setAttribute('src', URL.createObjectURL(filePhoto));
    photoPreview.setAttribute('id', 'photo_preview');
    photoPreview.setAttribute('height', '100%');
    photoPreview.setAttribute('width', '100%');
    document.querySelector('.ad-form__photo').appendChild(photoPreview);
  }
});
