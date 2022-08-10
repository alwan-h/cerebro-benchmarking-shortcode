// (function () {
//   createView();
// })();

function createView() {
  console.log('hello world');
  let root = document.getElementById('cerebro-benchmarking');
  console.log(root);

  root.style.width = '100%';
  root.style.padding = '16px';
  root.style.boxSizing = 'border-box';
  root.style.backgroundColor = 'lightgray';
  root.style.display = 'flex';
  root.style.justifyContent = 'space-between';

  fetchScore(root);
}

async function fetchScore(root) {
  try {
    await fetch('http://localhost:4011/api/benchmarking/scores')
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

createView();
