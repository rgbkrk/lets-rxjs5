const codsworthNames = require('clean-codsworth-names')
const mapSize = 2048

// newPlayer creates a new player with a name and some random coordinates
function newPlayer(name) {
  return {
    name: name,
    x: Math.round(Math.random() * (mapSize - 1)),
    y: Math.round(Math.random() * (mapSize - 1)),
  }
}

const uuid = require('uuid')
const adjectives = require('adjectives')

// Upper case the names
const Adjectives = adjectives.map(adj => {
  return adj.charAt(0).toUpperCase() + adj.slice(1)
})

function newPlayer(name) {
  const adj = Adjectives[Math.floor(Math.random() * Adjectives.length)];

  return {
    name: `${adj} ${name}`,
    id: uuid.v4(),
    x: Math.round(Math.random() * (mapSize - 1)),
    y: Math.round(Math.random() * (mapSize - 1)),
  }
}


// Random walk -1, 0, 1
function walk(pt) {
  const change = Math.cos(Math.PI * Math.round(Math.random())) // -1 or 1
                 * Math.round(Math.random()) // 0 or 1
  const newPt = pt + change
  if (newPt < 0 || newPt >= mapSize) {
    return pt
  }
  return newPt
}

const Rx = require('@reactivex/rxjs')

function livePlayer(player, period) {
  if(!player) {
    throw new Error('need a player');
  }
  if(!period) {
    period = 500;
  }
  return Rx.Observable.interval(period)
            .scan((p) => {
              return {
                name: p.name,
                id: p.id,
                x: walk(p.x),
                y: walk(p.y),
              };
            }, player);
}

// create a set of players with coordinates
const defaultPlayers = codsworthNames.map(newPlayer)

function livePlayers(players, period) {
  if(!players) {
    players = defaultPlayers;
  }
  if(!period) {
    period = 500;
  }

  return Rx.Observable.merge(...players.map(p => livePlayer(p, period)))
}


module.exports = {
  livePlayers
}
