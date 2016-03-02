const fakes = require('./fakes');

import { paint, MAP_SIZE } from './mapping';

import { Map, List } from 'immutable';

const width = MAP_SIZE;
const height = MAP_SIZE;

const mapCanvas = document.getElementById('map');

const Rx = require('@reactivex/rxjs');

var image;

const imageEl = new Image();
imageEl.src = 'CompanionWorldMap.png';
imageEl.onload = () => {
  image = imageEl;
  paint(mapCanvas, image);
};

const emptyGrid = new List(Array(width*height)).map(() => new List());

function index(x, y) {
  return width * y + x;
}

fakes.livePlayers(fakes.defaultPlayers, 10)
     .filter(coords => coords.x >= 0 && coords.y >= 0 &&
                       coords.x < MAP_SIZE && coords.y < MAP_SIZE)
     .scan((model, player) => {
       let grid = model.grid;

       const id = player.id;

       if (model.players.has(id)) {
         const original = model.players.get(id);
         const pos = index(original.x, original.y);
         // Remove the old entry
         grid = grid.set(pos, grid.get(pos).filter(x => x !== id));
       }

       const newPos = index(player.x, player.y);

       // collect the latest data for each player over time
       return {
         players: model.players.set(id, player),
         // add our new position to the player grid
         // TODO: use updateIn()
         grid: grid.update(newPos, c => c.push(id)),
       };
     }, { players: new Map(), grid: emptyGrid })
     .throttleTime(10)
     .subscribe(model => {
       window.requestAnimationFrame(paint.bind(null, mapCanvas, image, model.players));
     });

function normalizeCoordinates(canvas, event) {
  const style = document.defaultView.getComputedStyle(canvas, null);
  function styleValue(property) {
    return parseInt(style.getPropertyValue(property), 10) || 0;
  }

  const scaleX = canvas.width / styleValue('width');
  const scaleY = canvas.height / styleValue('height');

  const rect = canvas.getBoundingClientRect();

  const x = Math.round(scaleX * (event.clientX - rect.left - canvas.clientLeft - styleValue('padding-left')));
  const y = Math.round(scaleY * (event.clientY - rect.top - canvas.clientTop - styleValue('padding-top')));

  return {
    x,
    y,
  };
}

const mouseCoords = Rx.Observable.fromEvent(mapCanvas, 'mousemove')
  .map(normalizeCoordinates.bind(null, mapCanvas))
  .filter(coords => coords.x >= 0 && coords.y >= 0 &&
                    coords.x < MAP_SIZE && coords.y < MAP_SIZE);

mouseCoords.throttleTime(17).subscribe(x => console.log(x));
