const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.getElementById('avatar');
const avatarPreview = document.getElementById('header__preview');
const housePhotoChooser = document.getElementById('images');
const housePhotoPreview = document.getElementById('photo_priview');

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
    housePhotoPreview.src = URL.createObjectURL(filePhoto);
  }
});
