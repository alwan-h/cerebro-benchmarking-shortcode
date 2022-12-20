let root = document.getElementById('cerebro-benchmarking');
let sliderItemLength = 6;
let slidetItemWrapperLength = 0;
let scoreViewGap = 24;
let scoreData = [];
let dataLength = 20;

async function fetchScores() {
  return await fetch(
    'https://public-api.goodcityfoundation.org/api/benchmarking/scores',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      scoreData = data.data.benchmarking;
    });
}

function createRootView() {
  root.style.width = '100%';
  root.style.height = '55px';
  root.style.padding = '8px 40px';
  root.style.boxSizing = 'border-box';
  root.style.backgroundColor = '#11405b';
  root.style.display = 'flex';
  root.style.justifyContent = 'space-between';
  root.style.alignItems = 'center';
  root.style.gap = '16px';
  root.style.fontFamily = 'Poppins, sans-serif';
}

function createScoreView() {
  let scoreContainer = document.createElement('div');
  scoreContainer.setAttribute('id', 'score-view');
  scoreContainer.style.width = '100%';
  scoreContainer.style.height = '55px';
  scoreContainer.style.position = 'relative';
  scoreContainer.style.overflow = 'hidden';

  root.appendChild(scoreContainer);
}

function clearScoreView() {
  let element = document.getElementById('score-view');
  element.innerHTML = '';
}

function createScoreItemWrapper(index) {
  let parent = document.getElementById('score-view');
  let scoreItemWrapper = document.createElement('div');
  scoreItemWrapper.setAttribute('id', 'score-item-wrapper-' + index);
  scoreItemWrapper.style.height = 'auto';
  scoreItemWrapper.style.width = '100%';
  scoreItemWrapper.style.position = 'absolute';
  scoreItemWrapper.style.bottom = '0px';
  scoreItemWrapper.style.left = '0px';
  scoreItemWrapper.style.backgroundColor = 'red';

  // scoreItemWrapper.appendChild(scoreItemWrapperInner);

  parent.appendChild(scoreItemWrapper);
}

function newCreateScoreItem(i, j) {
  let parent = document.getElementById('score-item-wrapper-' + i);

  let scoreItemWrapperInner = document.createElement('div');
  scoreItemWrapperInner.setAttribute('id', 'score-item-wrapper-inner-' + j);
  scoreItemWrapperInner.style.height = '55px';
  scoreItemWrapperInner.style.width = '100%';
  scoreItemWrapperInner.style.display = 'flex';
  scoreItemWrapperInner.style.alignItems = 'center';
  scoreItemWrapperInner.style.gap = scoreViewGap + 'px';

  let scoreItem = document.createElement('div');
  scoreItem.setAttribute('id', 'score-item-' + i + '' + j);
  scoreItem.style.flex = 1;
  scoreItem.style.height = '40px';
  scoreItem.style.alignItems = 'center';
  scoreItem.style.backgroundColor = 'green';

  scoreItemWrapperInner.appendChild(scoreItem);

  parent.appendChild(scoreItemWrapperInner);
}

function createScoreItem(data) {
  let parent = document.getElementById('score-view');
  let scoreItem = document.createElement('div');
  scoreItem.setAttribute('id', 'score-item');
  scoreItem.style.color = 'white';
  scoreItem.style.display = 'flex';
  scoreItem.style.alignItems = 'center';
  scoreItem.style.gap = '8px';

  let score = 0;

  data.scores.map((s) => {
    score += s.score;
  });

  scoreItem.innerHTML = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 0L16.7272 14.25H0.272758L8.5 0Z" fill="#2ECC71" /></svg>
    <div style="font-size: 30px">${score}</div>
    <div>
      <div style="font-size:14px">${data.user.detail.city}</div>
      <div style="font-size:12px">${data.user.detail.country}</div>
    </div>`;

  parent.appendChild(scoreItem);
}

function createLogoView(root) {
  let logoContainer = document.createElement('div');
  logoContainer.style.width = '160px';
  logoContainer.style.display = 'flex';
  logoContainer.style.justifyContent = 'end';
  // logoContainer.style.backgroundColor = 'yellow';

  let logo = document.createElement('img');
  logo.src =
    'https://urban-cerebro.vercel.app/images/gcf-logo-inline-light.svg';
  logo.style.width = '100px';
  logo.style.height = 'auto';

  logoContainer.appendChild(logo);

  root.appendChild(logoContainer);
}

function getWindowWidth() {
  return window.innerWidth;
}

function getScoreWrapperWidth() {
  let scoreWrapper = document.getElementById('score-view');
  return scoreWrapper.offsetWidth;
}

function getScoreItemWrapperWidth() {
  let scoreItemWrapper = document.getElementById('score-item');
  return scoreItemWrapper.offsetWidth;
}

function setSliderItem() {
  for (let i = 0; i < slidetItemWrapperLength; i++) {
    createScoreItemWrapper(i);
    for (let j = 0; j < sliderItemLength; j++) {
      newCreateScoreItem(i, j);
    }
  }
}

function setAnimationSlider() {}

function setResponsive() {
  // if (window.matchMedia('(max-width: 600px)')) {
  //   console.log('phones');
  // } else if (window.matchMedia('(min-width: 600px)')) {
  //   console.log('portrait tablets and large phones');
  // } else if (window.matchMedia('(min-width: 768px)')) {
  //   console.log('landscape tablets');
  // } else if (window.matchMedia('(min-width: 992px)')) {
  //   console.log('laptops/desktops');
  // } else if (window.matchMedia('(min-width: 1200px)')) {
  //   console.log('large laptops and desktops');
  // } else {
  //   console.log('out of query');
  // }

  console.log('window width', getWindowWidth());
  if (getWindowWidth() <= 600) {
    console.log('phones');
    sliderItemLength = 1;
    slidetItemWrapperLength = Math.ceil(dataLength / sliderItemLength);
    console.log('wrapper length', slidetItemWrapperLength);
    setSliderItem();
  } else if (getWindowWidth() > 600 && getWindowWidth() < 768) {
    console.log('portrait tablets and large phones');
    sliderItemLength = 2;
    slidetItemWrapperLength = Math.ceil(dataLength / sliderItemLength);
    console.log('wrapper length', slidetItemWrapperLength);
    setSliderItem();
  } else if (getWindowWidth() >= 768 && getWindowWidth() < 992) {
    console.log('landscape tablets');
    sliderItemLength = 4;
    slidetItemWrapperLength = Math.ceil(dataLength / sliderItemLength);
    console.log('wrapper length', slidetItemWrapperLength);
    setSliderItem();
  } else if (getWindowWidth() >= 992 && getWindowWidth() < 1200) {
    console.log('laptops/desktops');
    sliderItemLength = 5;
    slidetItemWrapperLength = Math.ceil(dataLength / sliderItemLength);
    console.log('wrapper length', slidetItemWrapperLength);
    setSliderItem();
  } else if (getWindowWidth() >= 1200) {
    console.log('large laptops and desktops');
    sliderItemLength = 6;
    slidetItemWrapperLength = Math.ceil(dataLength / sliderItemLength);
    console.log('wrapper length', slidetItemWrapperLength);
    setSliderItem();
  }
}

function onWindowResize() {
  window.addEventListener('resize', function () {
    console.log('resize');
    // setSliderItem();
    clearScoreView();
    setResponsive();
  });
}

async function init() {
  await fetchScores();
  console.log('scores', scoreData);
  createRootView();
  createScoreView(root);
  createLogoView(root);
  setResponsive();
  onWindowResize();
}

init();
