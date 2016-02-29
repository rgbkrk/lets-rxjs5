const fakes = require('./fakes');
const paint = require('./mapping').paint;

const mapCanvas = document.getElementById('map');

var image;

const imageEl = new Image();
imageEl.src = 'CompanionWorldMap.png';
imageEl.onload = () => { image = imageEl; };

fakes.livePlayers(fakes.defaultPlayers, 10)
     .scan((players, player) => {
       return players.set(player.id, player);
     }, new Map())
     .throttleTime(17)
     .subscribe(players => {
       paint(mapCanvas, players, image);
     });
