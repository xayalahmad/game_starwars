class StarWars {
    heroes = {
      "Obi-Wan Kenobi": {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 8,
        imageUrl: "assets/images/obi-wan.jpg",
        enemyAttackBack: 15,
      },
      "Luke Skywalker": {
        name: "Luke Skywalker",
        health: 100,
        attack: 14,
        imageUrl: "assets/images/luke-skywalker.jpg",
        enemyAttackBack: 5,
      },
      "Darth Sidious": {
        name: "Darth Sidious",
        health: 150,
        attack: 8,
        imageUrl: "assets/images/darth-sidious.png",
        enemyAttackBack: 20,
      },
      "Darth Maul": {
        name: "Darth Maul",
        health: 180,
        attack: 7,
        imageUrl: "assets/images/darth-maul.jpg",
        enemyAttackBack: 25,
      },
    };
  
    attacker;
    combatants = [];
    defender;
    turnCounter = 1;
    killCount = 0;
  
    chooseCharacter(hero, showArea) {
      var heroDiv = $(`<div class='character' data-hero='${hero.name}'>`);
      var heroName = $("<div class='character-name'>");
      heroName.text(hero.name);
      var heroImg = $("<img alt='image' class='character-image'>");
      heroImg.attr("src", hero.imageUrl);
      var heroHealth = $("<div class='character-health'>");
      heroHealth.text(hero.health);
      heroDiv.append(heroName, heroImg, heroHealth);
      $(showArea).append(heroDiv);
    }
  
    startGame() {
      for (var i in this.heroes) {
        this.chooseCharacter(this.heroes[i], "#characters-section");
      }
    }
  
    chooseHero(selectedHero, selectedShowArea) {
      $(selectedShowArea).empty();
      this.chooseCharacter(selectedHero, selectedShowArea);
    }
  
    chooseEnemyHero(enemyList) {
      for (var i = 0; i < enemyList.length; i++) {
        this.chooseCharacter(enemyList[i], "#available-to-attack-section");
      }
    }
  
    restartGame() {
      var restartBtn = $("<button>Restart</button>");
      restartBtn.click(function () {
        location.reload();
      });
      $("body").append(restartBtn);
    }
  
    displayMessage(message) {
      var gameMessageSection = $("#game-message");
      var gameMessage = $("<div>").text(message);
      gameMessageSection.append(gameMessage);
    }
  
    clearMessage() {
      var messageSection = $("#game-message");
      messageSection.text("");
    }
  }
  
  let starGame = new StarWars();
  starGame.startGame();
  
  $("#characters-section").on("click", ".character", function () {
    var heroName = $(this).data("hero");
    if (starGame.attacker !== null) {
      starGame.attacker = starGame.heroes[heroName];
      for (i in starGame.heroes) {
        if (heroName !== starGame.heroes[i].name) {
          starGame.combatants.push(starGame.heroes[i]);
        }
      }
    }
  
    starGame.chooseHero(starGame.attacker, "#selected-character");
    starGame.chooseEnemyHero(starGame.combatants);
    $("#characters-section").hide();
  });
  
  $("#available-to-attack-section").on("click", ".character", function () {
    var heroName = $(this).data("hero");
    if (starGame.defender !== null) {
      starGame.defender = starGame.heroes[heroName];
      starGame.chooseHero(starGame.defender, "#defender");
  
      $(this).remove();
      starGame.clearMessage();
    }
  });
  
  $("#attack-button").on("click", function () {
    starGame.turnCounter++;
    starGame.defender.health -= starGame.attacker.attack * starGame.turnCounter;
    starGame.attacker.health -= starGame.defender.attack;
    starGame.chooseHero(starGame.attacker, "#selected-character");
    starGame.chooseHero(starGame.defender, "#defender");
    if (starGame.defender.health <= 0 || starGame.attacker.health <= 0) {
      starGame.restartGame();
      $("#attack-button").off("click");
    }
  });