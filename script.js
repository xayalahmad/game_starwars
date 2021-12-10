class Container {
  allPlayers = []
  player1
  player2
  player1win = 1
  player1lose = 0

    players = {
      "Obi-Wan Kenobi": {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 8,
        imageUrl: "./images/obi-wan.jpg",
        enemyAttackBack: 15
      },
      "Luke Skywalker": {
        name: "Luke Skywalker",
        health: 100,
        attack: 14,
        imageUrl: "./images/luke-skywalker.jpg",
        enemyAttackBack: 5
      },
      "Darth Sidious": {
        name: "Darth Sidious",
        health: 150,
        attack: 8,
        imageUrl: "./images/darth-sidious.png",
        enemyAttackBack: 20
      },
      "Darth Maul": {
        name: "Darth Maul",
        health: 180,
        attack: 7,
        imageUrl: "./images/darth-maul.jpg",
        enemyAttackBack: 25
      }
    };

    gamesPlayers (player, area){
      playerCard = $("<div class='playerBox character'>")
      playerName = $("<div class='playerName character-name'>").text(player.name)
      playerImg = $("<img class='playerImg character-image'>").attr("src", player.imageUrl)
      playerScore = $("<div class='playerScore character-health'>").text(player.health)
      playerCard.append(playerName).append(playerImg).append(playerScore)
      $(area).append(playerCard)
    }

    start = function(){
      for(var i in players){
        gamesPlayers(players[i], "#characters-section")
      }
    }
    start()




















});
  