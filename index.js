const fakes = require('./fakes');
const paint = require('./mapping').paint;

const mapCanvas = document.getElementById('map');

var image;

const imageEl = new Image();
imageEl.src = 'CompanionWorldMap.png';
imageEl.onload = () => {
  image = imageEl;
  paint(mapCanvas, image);
};

fakes.livePlayers(fakes.defaultPlayers, 10)
     .scan((players, player) => {
       // collect the latest data for each player over time
       return players.set(player.id, player);
     }, new Map())
     .throttleTime(10)
     .subscribe(players => {
       window.requestAnimationFrame(paint.bind(null, mapCanvas, image, players));
     });
