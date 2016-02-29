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
     .throttleTime(170)
     .subscribe(players => {
       paint(mapCanvas, players, image);
     });
