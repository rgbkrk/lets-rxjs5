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
     // To render at approximately 60fps, we need to throttle by 16.66667 ms
     // 1 second = 1000 ms => 1000/60 = 16.6667 ms between frames
     .throttleTime(17)
     .subscribe(players => {
       paint(mapCanvas, image, players);
     });
