const MAP_SIZE = 2048;

// Take a Canvas 2d context, paint to it
function paint(canvas, players, image) {
  const context = canvas.getContext('2d');
  context.save();

  if(image) {
    context.globalCompositeOperation = 'source-over';
    context.drawImage(image, 0, 0);
  }
  else {
    context.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
  }

  for(var player of players.values()) {
    context.fillStyle = '#' + player.id.slice(0, 6);
    context.fillRect(player.x, player.y, 2, 2);
  }
  context.restore();
}

module.exports = {
  paint,
};
