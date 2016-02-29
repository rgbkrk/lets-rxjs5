const Rx = require('@reactivex/rxjs')

const fakes = require('./fakes');
const paint = require('./mapping').paint;

const mapCanvas = document.getElementById('map');

var image;

const imageEl = new Image();
imageEl.src = 'CompanionWorldMap.png';
imageEl.onload = () => { image = imageEl; };

fakes.livePlayers()
     .scan((players, player) => {
       players[player.id] = player;
       return players;
     }, {})
     .throttleTime(16) // Pretend I'm worried about 60fps
     .subscribe(players => {
       paint(mapCanvas, players, image);
     });
