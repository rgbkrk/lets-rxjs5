const MAP_SIZE = 2048;

function paintPlayer(context, player) {
  context.fillStyle = '#' + player.id.slice(0, 6);
  context.fillRect(player.x, player.y, 2, 2);
}

// Take a Canvas 2d context, paint to it
function paint(canvas, image, players) {
  const context = canvas.getContext('2d');
  context.save();

  if(image) {
    context.drawImage(image, 0, 0);
  }
  else {
    context.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
  }

  if(players) {
    players.forEach(paintPlayer.bind(null, context));
  }

  context.restore();
}

module.exports = {
  paint,
};
