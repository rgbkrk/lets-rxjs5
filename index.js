const fakes = require('./fakes');

fakes.livePlayers()
     .take(5)
     .subscribe(player => {
       document.write(JSON.stringify(player));
     });
