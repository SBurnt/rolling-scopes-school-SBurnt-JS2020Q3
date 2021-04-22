const greetingTime = document.querySelector('.greeting__time');
const greetingTimesDay = document.querySelector('.greeting__times-day');
const name = document.querySelector('.greeting__name');
const nameEdit = document.querySelector('.greeting__name-edit');
const greetingGoals = document.querySelector('.greeting__goals');
const quoteText = document.querySelector('.quote__text');
const quoteAutor = document.querySelector('.quote__autor');
const quoteBtnNext = document.querySelector('.quote__btn-next');
const weatherCity = document.querySelector('.weather__city');
const weatherIcoTemp = document.querySelector('.weather__ico-temp');
const weatherTemp = document.querySelector('.weather__temp');
const weatherWind = document.querySelector('.weather__wind');
const weatherHumidity = document.querySelector('.weather__humidity');

function showTime() {
  let currentTime = new Date();

  let todayOpt = currentTime.toLocaleString('ru-RU', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  greetingTime.innerHTML = todayOpt;
  setTimeout(showTime, 1000);
}

function setBgGreet() {
  let currentTime = new Date();
  let hour = currentTime.toLocaleString('ru-RU', {
    hour: '2-digit',
  });

  if (hour >= 00 && hour < 06) {
    // night
    document.body.style.backgroundImage = "url('assets/img/night/01.jpg')";
    greetingTimesDay.textContent = 'Доброй ночи, ';
  } else if (hour >= 06 && hour < 12) {
    // morning
    document.body.style.backgroundImage = "url('assets/img/morning/01.jpg')";
    greetingTimesDay.textContent = 'Доброе утро, ';
  } else if (hour >= 12 && hour < 18) {
    // afternoon
    document.body.style.backgroundImage = "url('assets/img/afternoon/01.jpg')";
    greetingTimesDay.textContent = 'Добрый день, ';
  } else if (hour >= 18 && hour <= 23) {
    // evening
    document.body.style.backgroundImage = "url('assets/img/evening/01.jpg')";
    greetingTimesDay.textContent = 'Добрый вечер, ';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Ваше имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      name.blur();
      name.style.background = '';
    }
  } else {
    if (name.textContent === '') {
      if (localStorage.getItem('name')) {
        name.textContent = localStorage.getItem('name');
      } else {
        name.textContent = '[Ваше имя]';
        name.style.background = '';
      }
      return;
    }
    localStorage.setItem('name', e.target.innerText);
    name.style.background = '';
  }
}

function getGreetingGoals() {
  if (localStorage.getItem('greetingGoals') === null) {
    greetingGoals.textContent = '[Введите цели]';
  } else {
    greetingGoals.textContent = localStorage.getItem('greetingGoals');
  }
}

function setGreetingGoals(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      greetingGoals.blur();
      greetingGoals.style.background = '';
    }
  } else {
    if (greetingGoals.textContent === '') {
      if (localStorage.getItem('greetingGoals')) {
        greetingGoals.textContent = localStorage.getItem('greetingGoals');
      } else {
        greetingGoals.textContent = '[Введите цели]';
        greetingGoals.style.background = '';
      }
      return;
    }
    localStorage.setItem('greetingGoals', e.target.innerText);
    greetingGoals.style.background = '';
  }
}

function getWeatherCity() {
  if (localStorage.getItem('weatherCity') === null) {
    // getCity();
    weatherIcoTemp.style.display = 'none';
    weatherCity.textContent = 'введите город';
  } else {
    weatherCity.textContent = localStorage.getItem('weatherCity');
    getWeather(weatherCity.textContent);
  }
}

function setWeatherCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('weatherCity', e.target.innerText);
      weatherCity.blur();
      getWeather(weatherCity.textContent);
      weatherCity.style.background = '';
    }
  } else {
    localStorage.setItem('weatherCity', e.target.innerText);
    getWeather(weatherCity.textContent);
    weatherCity.style.background = '';
  }
}

name.addEventListener('click', () => {
  name.style.background = 'rgba(0, 0, 0, 0.8)';
  name.textContent = '';
});
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
greetingGoals.addEventListener('click', () => {
  greetingGoals.style.background = 'rgba(0, 0, 0, 0.8)';
  greetingGoals.textContent = '';
});
greetingGoals.addEventListener('keypress', setGreetingGoals);
greetingGoals.addEventListener('blur', setGreetingGoals);
weatherCity.addEventListener('click', () => {
  weatherCity.style.background = 'rgba(0, 0, 0, 0.8)';
  // weatherCity.textContent = '';
});
weatherCity.addEventListener('keypress', setWeatherCity);
weatherCity.addEventListener('blur', setWeatherCity);

let urlQuote = 'https://favqs.com/api/qotd';

async function getQuote() {
  let response = await fetch(urlQuote, {
    method: 'GET',
  });

  if (response.ok) {
    let result = await response.json();
    quoteText.textContent = result.quote.body;
    quoteAutor.textContent = result.quote.author;
  } else {
    quoteText.textContent = `I think early on I knew what I was going to do and it was based a lot on familiarity
    but it was also because I didn't have a lot of skills. There was nothing I wanted t be. I didn't want to
    be a doctor. I wanted to be in show business.`;
    quoteAutor.textContent = `Christopher Walken`;
  }
}

quoteBtnNext.addEventListener('click', function () {
  getQuote();
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=f57a144803808ce82b7c0f4f05b07edc&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  function showEl(el) {
    weatherIcoTemp.style.display = el;
    weatherTemp.style.display = el;
    weatherWind.style.display = el;
    weatherHumidity.style.display = el;
  }

  if (data.message == 'city not found') {
    weatherCity.textContent = 'не верный город';
    showEl('none');
  } else {
    weatherCity.textContent = data.name;
    showEl('block');
    weatherIcoTemp.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    weatherIcoTemp.title = data.weather[0].description;
    weatherIcoTemp.alt = data.weather[0].description;
    weatherTemp.textContent = `${data.main.temp} °C`;
    weatherTemp.title = data.weather[0].description;
    weatherWind.textContent = `Ветер: ${data.wind.speed} м/с`;
    weatherHumidity.textContent = `Влажность: ${data.main.humidity} %`;
  }
}

async function getCity() {
  const url = `http://ip-api.com/json/?lang=ru`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.ok) {
    getWeather(data.city);
  } else {
    weatherCity.textContent = 'введите город';
  }
}

showTime();
setBgGreet();
getName();
getGreetingGoals();
getQuote();
getWeatherCity();
