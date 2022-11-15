let sampleData = {
  meta: {
    code: 200,
    status: 'success',
  },
  data: {
    benchmarking: [
      {
        _id: '6369f5c3861eb81e236ef602',
        is_locked: true,
        scores: [
          {
            parameter: 'Measurement of Urban Governance Wisdom',
            score: 1.5,
          },
          {
            parameter:
              'Measurement of Digital finance inclusiveness and infrastructure',
            score: 2,
          },
          {
            parameter:
              'Measurement of Young and Younger Generation Future Readiness',
            score: 2,
          },
          {
            parameter:
              'Measurement of Culture Diversity, Deep-Rootedness, Food Authenticity and Heritage Sustainability',
            score: 3.5,
          },
          {
            parameter:
              'Measurement of Food Sufficiency, Energy Circulation and Economics',
            score: 3.5,
          },
        ],
        user: {
          _id: '6369f3b8c15c7a74d2fe9e7f',
          created_at: '2022-11-08T06:14:16.844Z',
          detail: {
            city: 'Depok',
            company_name: '',
            country: 'Indonesia',
            job_title: '',
            lat: '-7.76250000',
            lng: '110.43167000',
            region: 'Asia',
            roles: 'Government',
            state: 'DI Yogyakarta',
          },
          email: 'fadh.dzaki@gmail.com',
          email_verification_at: '2022-11-08T06:14:16.839Z',
          is_invited: false,
          is_parent: true,
          name: 'Dzaki fadh',
          phone: '',
          photo:
            'https://lh3.googleusercontent.com/a/ALm5wu36kgFJQPp0DX2d2k9kHUd3_2FQXwmsJFrqbyOVIw=s96-c',
          updated_at: '2022-11-08T06:22:59.109Z',
        },
      },
      {
        _id: '636ec491861eb81e236ef608',
        is_locked: false,
        scores: [
          {
            parameter: 'Measurement of Urban Governance Wisdom',
            score: 5,
          },
          {
            parameter:
              'Measurement of Digital finance inclusiveness and infrastructure',
            score: 5,
          },
          {
            parameter:
              'Measurement of Young and Younger Generation Future Readiness',
            score: 4,
          },
          {
            parameter:
              'Measurement of Culture Diversity, Deep-Rootedness, Food Authenticity and Heritage Sustainability',
            score: 2.5,
          },
          {
            parameter:
              'Measurement of Food Sufficiency, Energy Circulation and Economics',
            score: 2.5,
          },
        ],
        user: {
          _id: '63698cb3c15c7a74d2fe9e7d',
          created_at: '2022-11-07T22:54:43.039Z',
          detail: {
            city: 'Mataram',
            company_name: '',
            country: 'Indonesia',
            job_title: '',
            lat: '-8.58333000',
            lng: '116.11667000',
            region: 'Asia',
            roles: 'Government',
            state: 'Nusa Tenggara Barat',
          },
          email: 'alwanhasmadi@gmail.com',
          email_verification_at: '2022-11-07T22:54:43.034Z',
          is_invited: false,
          is_parent: true,
          name: 'Alwan Hasmadi',
          phone: '',
          photo:
            'https://lh3.googleusercontent.com/a/ALm5wu23UYBnIZa_qL-SyR0B7omhevnP1WMCOPS-NChfqQ=s96-c',
          updated_at: '2022-11-11T21:54:25.708Z',
        },
      },
    ],
  },
};

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

function createScoreView(root) {
  let scoreContainer = document.createElement('div');
  scoreContainer.style.width = '100%';
  scoreContainer.style.display = 'flex';
  scoreContainer.style.alignItems = 'center';
  scoreContainer.style.gap = '24px';

  sampleData.data.benchmarking.map((d) => {
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

  scoreItem.innerHTML =
    `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 0L16.7272 14.25H0.272758L8.5 0Z" fill="#2ECC71" /></svg>` +
    `<div style="font-size: 30px">${score}</div>` +
    `<div>
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

async function fetchScore(root) {
  try {
    await fetch('./data/benchmarking.json')
      .then((response) => response.json())
      .then((data) => {
        data.data.benchmarking.map((d, i) => {
          let total = 0;

          for (let index = 0; index < d.scores.length; index++) {
            console.log('score', d.scores[index].score);
            total = total + d.scores[index].score;
          }

          let grid = document.createElement('div');
          grid.innerHTML =
            '<span style="font-weight:bold;font-family:sans-serif">' +
            d.user.detail.city +
            '</span> : ' +
            '<span style="font-weight:bold;font-family:sans-serif">' +
            total +
            '</span>';

          root.appendChild(grid);
          // console.log(d);
        });

        // console.log(data);
      });
  } catch (error) {}
}

function init() {
  createRootView();
  createScoreView(root);
  createLogoView(root);
}

init();
