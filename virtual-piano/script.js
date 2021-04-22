const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const body = document.querySelector('body');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const btnFullscreen = document.querySelector('.fullscreen');

const playSoundMouse = (e) => {
  e.target.classList.add('piano-key-active');

  const dataNote = e.target.getAttribute('data-note');
  const audio = new Audio(`assets/audio/${dataNote}.mp3`);
  audio.currentTime = 0;
  audio.play();
};

const stopSoundMouse = (e) => {
  e.target.classList.remove('piano-key-active');
};

const mouseDown = (e) => {
  if (e.target.classList.contains('piano-key')) {
    e.target.classList.add('piano-key-active');
    playSoundMouse(e);
  }

  pianoКeys.forEach((key) => {
    key.addEventListener('mouseover', playSoundMouse);
    key.addEventListener('mouseout', stopSoundMouse);
  });
};

const mouseUp = () => {
  pianoКeys.forEach((key) => {
    key.classList.remove('piano-key-active');
    key.removeEventListener('mouseover', playSoundMouse);
    key.removeEventListener('mouseout', stopSoundMouse);
  });
};

piano.addEventListener('mousedown', mouseDown, false);
body.addEventListener('mouseup', mouseUp);

btnLetters.addEventListener('click', () => {
  btnNotes.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');

  pianoКeys.forEach((key) => {
    key.classList.add('piano-key-letter');
  });
});

btnNotes.addEventListener('click', () => {
  btnNotes.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');

  pianoКeys.forEach((key) => {
    key.classList.remove('piano-key-letter');
  });
});

const playSoundKeyboard = (e) => {
  e.classList.add('piano-key-active');

  const dataNote = e.getAttribute('data-note');
  const audio = new Audio(`assets/audio/${dataNote}.mp3`);
  audio.currentTime = 0;
  audio.play();
};

let allowed = true;
const keyDown = (e) => {
  if (e.repeat != undefined) {
    allowed = !e.repeat;
  }
  if (!allowed) return;
  allowed = false;

  const keyCode = e.code;

  pianoКeys.forEach((key) => {
    if (keyCode === `Key${key.getAttribute('data-letter')}`) {
      playSoundKeyboard(key);
    }
  });
};

const keyUp = () => {
  pianoКeys.forEach((key) => {
    key.classList.remove('piano-key-active');
  });
};

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp);

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

btnFullscreen.addEventListener('click', toggleFullScreen);
