const codsworthNames = require('clean-codsworth-names')
const mapSize = 2048

const uuid = require('uuid')
const adjectives = require('adjectives')

// Upper casing these for their name
const Adjectives = adjectives.map(adj => {
  return adj.charAt(0).toUpperCase() + adj.slice(1)
})

function newPlayer(name) {
  const adj = Adjectives[Math.floor(Math.random() * Adjectives.length)];

  return {
    name: `${adj} ${name}`,
    x: Math.round(Math.random() * (mapSize - 1)),
    y: Math.round(Math.random() * (mapSize - 1)),
    id: uuid.v4(),
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

function generatePlayerData(period) {
  if(!period){
    period = 500;
  }

  const players = codsworthNames
                    .map(newPlayer)
                    .map(player => {
                      return Rx.Observable.interval(period)
                                          .scan((p) => {
                                            return {
                                              name: p.name,
                                              id: p.id,
                                              x: walk(p.x),
                                              y: walk(p.y),
                                            }
                                          }, player)
                                })


  const gameState = {
    players: codsworthNames.map(newPlayer)
  }
  Rx.Observable
    .interval(period)
}
