const fakes = require('./fakes');

fakes.livePlayers()
     .take(1)
     .subscribe(player => {
       console.log(player);
       document.write(JSON.stringify(player));
     });
