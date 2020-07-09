/**
 * Created by allen on 7/5/2020.
 */

// BattleEngine is a serializeable object
// that contains all of the non-gui logic of the encouner builder
class BattleEngine {
    constructor() {
        this.theParty = new Party();
        this.theEnemies = new Party();
        this.currentChar = -1; //index of selected character
        this.currentEnemy = -1; //index of selected enemy
    }

    addPartyMember(character) {
        this.theParty.addMember(character);
        if (this.currentChar < 1) {
            this.currentCar = 0;
        }
    }

    addOpponent(character) {
        this.theEnemies.addMember(character);
        if (this.currentEnemy < 0) {
            this.currentEnemy = 0;
        }
    }
}

class Party {
    constructor() {
        this.members = new Array();
    }

    addMember(character) {
        this.members.push(character);
    }

    setOpponent(opponent) {
        for (var index = 0; index < this.members.length; index++) {
            this.members[index].setOpponent(opponent);
        }
    }

    getAvgDamage() {
        var totalDamage = 0;
        for (var index = 0; index < this.members.length; index++) {
            totalDamage += this.members[index].getAvgDamage();
        }
        return totalDamage;
    }
}

class Combatant {
    constructor(name, bonusToHit, bonusDamage) {
        this.name = name;
        this.bonusToHit = bonusToHit;
        this.bonusDamage = bonusDamage;
        this.attacks = new Array();
        this.advantageDice = 2;
        this.advantageChance = 0;
        this.extraDamage = 0;
        this.extraDamagePercent = 0;
    }

    addAttack(name, minDamage, maxDamage) {
        this.attacks.push(new Attack(this, name, minDamage, maxDamage));
    }

    setArmorClass(armorClass) {
        this.armorClass = armorClass;
    }

    setAdvantageChance(chance) {
        this.advantageChance = chance;
    }

    setAdvantageDice(dice) {
        this.advantageDice = dice;
    }

    setOpponent(opponent) {
        this.opponent = opponent;
    }

    setExtraDamage(amount, percent) {
        this.extraDamage = amount;
        this.extraDamagePercent = percent;
    }

    getExtraDamage() {
        return this.extraDamage * this.extraDamagePercent;
    }

    getAvgDamage() {
        var totalDamage = 0;
        for (var index = 0; index < this.attacks.length; index++) {
            totalDamage += this.attacks[index].getAvgDamage();
        }
        return totalDamage;
    }
}

class Attack {
    constructor(owner, name, minDamage, maxDamage) {
        this.owner = owner;
        this.name = name;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
    }

    getAvgDamage() {
        var avgDmg = (this.minDamage + this.maxDamage) / 2;
        avgDmg += this.owner.getExtraDamage();
        avgDmg += this.owner.bonusDamage;
        var targetToHit = this.owner.opponent.armorClass - this.owner.bonusToHit;
        var advantageEffect = CalculateAdvBonus(this.owner.advantageDice, targetToHit)
        advantageEffect *= this.owner.advantageChance;
        targetToHit -= advantageEffect;
        var percentHit = CalculateAdvantage(1, targetToHit)
        return avgDmg * percentHit;
    }
}

function CalculateAdvBonus(numDice, DC) {
    var pNormal = (21 - DC) / 20;
    var pAdv = 1 - Math.pow(1 - pNormal, numDice);
    return 100 * (pAdv - pNormal) / 5;
}

function CalculateAdvantage(numDice, DC) {
    var pNormal = (21 - DC) / 20;
    var pAdv = 1 - Math.pow(1 - pNormal, numDice);
    return pAdv;
}

/*main
//configure the party
myParty = new Party();

// configure the players
Mabe = new Combatant(6,4);
Mabe.addAttack(1,8);
Mabe.setAdvantageChance(.7);
Mabe.setAdvantageDice(3);
Mabe.setExtraDamage(3.5,1);

myParty.addMember(Mabe);

// configure the opponent
Boss = new Combatant(6,4);
Boss.setArmorClass(15);
myParty.setOpponent(Boss);

// calculate
console.log(myParty.getAvgDamage());
//console.log(Mabe.attacks[0].getAvgDamage());
//console.log(CalculateAdvantage(1,10));
//console.log(CalculateAdvBonus(2,10));
//console.log(CalculateAdvBonus(3,10));*/
