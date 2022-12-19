let root = document.getElementById('cerebro-benchmarking');
// let scoreContainer = document.createElement('div');

function createRootView() {
  // console.log('hello world');
  // let root = document.getElementById('cerebro-benchmarking');
  // console.log(root);

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

  // fetchScore(root);
}

function createScoreView(root, data) {
  let scoreContainer = document.createElement('div');
  scoreContainer.style.width = '100%';
  scoreContainer.style.display = 'flex';
  scoreContainer.style.alignItems = 'center';
  scoreContainer.style.gap = '24px';

  data.data.benchmarking.map((d) => {
    createScoreItem(scoreContainer, d);
  });

  root.appendChild(scoreContainer);
}

function createScoreItem(parent, data) {
  let scoreItem = document.createElement('div');
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
  logoContainer.style.width = '120px';
  // logoContainer.style.backgroundColor = 'yellow';

  let logo = document.createElement('img');
  logo.src =
    'https://urban-cerebro.vercel.app/images/gcf-logo-inline-light.svg';
  logo.style.width = '100%';
  logo.style.height = 'auto';

  logoContainer.appendChild(logo);

  root.appendChild(logoContainer);
}

async function fetchScores() {
  return await fetch(
    'https://public-api.goodcityfoundation.org/api/benchmarking/scores',
    {
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      return data;
    });
}

async function init() {
  let dataScores = await fetchScores();
  console.log('scores', dataScores);
  createRootView();
  createScoreView(root, dataScores);
  createLogoView(root);
}

init();
