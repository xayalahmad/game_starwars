class Container {
  
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
    
    allPlayers = []
    player1
    player2
    power = 1
    player1lose = 0
    gamesPlayers(player, area){
      let playerCard = $(`<div data-hero='${player.name}' class='character'>`)
      let playerName = $("<div class='playerName character-name'>").text(player.name)
      let playerImg = $("<img class='playerImg character-image'>").attr("src", player.imageUrl)
      let playerScore = $("<div class='playerScore character-health'>").text(player.health)
      playerCard.append(playerName).append(playerImg).append(playerScore)
      $(area).append(playerCard)
    }


    start() {
      for(var i in this.players){
        this.gamesPlayers(this.players[i], "#characters-section")
      }
    }
    selectPlayer1(myPlayer, myArea){
      $(myArea).empty()
      this.gamesPlayers(myPlayer, myArea)
    }
    selectPlayer2(AllPlayer2){
      for(var i=0; i < AllPlayer2.length; i++){
        this.gamesPlayers(AllPlayer2[i], "#available-to-attack-section")
      }
    }
    restart(){
      var resBtn = $("<button>Restart</button>")
      resBtn.click(function(){
        location.reload()
      })
      $("#buttonarea").html(resBtn)
    }
    message(mess) {
      var messageSection = $("#game-message")
      var message = $("<div>").text(mess)
      messageSection.append(message)
    }
    reloadMessage(){
      $("#game-message").text("")
    }
};
let startGame = new Container()
startGame.start()

$("#characters-section").on("click", ".character", function(){
  var playerName = $(this).data("hero");
  if(startGame.player1 !== null){ 
    startGame.player1 = startGame.players[playerName]
    
    for(var i in startGame.players){
      if(playerName !== startGame.players[i].name){
        startGame.allPlayers.push(startGame.players[i])
      }
      console.log(playerName)
      console.log(startGame.players[i].name)

    }
  }
        startGame.selectPlayer1(startGame.player1, "#selected-character")
        startGame.selectPlayer2(startGame.allPlayers)
        $("#characters-section").hide();
})

$("#available-to-attack-section").on("click", ".character", function () {
  var plName = $(this).data("hero");

  if (startGame.player2 !== null) {
    startGame.player2 = startGame.players[plName]
    startGame.selectPlayer1(startGame.player2, "#defender")
    $(this).remove()
    // startGame.clearMessage()
  }   
});

$("#attack-button").on("click", function () {

  startGame.power++

  startGame.player2.health -= startGame.player1.attack * startGame.power
  startGame.player1.health -= startGame.player2.attack

  startGame.selectPlayer1(startGame.player1, "#selected-character")
  startGame.selectPlayer1(startGame.player2, "#defender")

  if (startGame.player2.health <= 0 || startGame.player1.health <= 0) {
    alert(`Your win. ${startGame.player2.name} is lose. Please choose new defender`)
    $("#defender").empty()
    
    $("#defender").text = ""
    
      startGame.restart();
    
    // $("#attack-button").off("click");
  }
});