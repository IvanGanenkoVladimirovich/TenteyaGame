const totalPoints = 100;
const bodyParts = [
  { name: "arm", dmg: 20 },
  { name: "leg", dmg: 30 },
  { name: "stomach", dmg: 40 },
  { name: "chest", dmg: 50 },
  { name: "neck", dmg: 80 },
  { name: "head", dmg: 60 }
];

function rollDice(count, sides) {
  let sum = 0;
  for (let i = 0; i < count; i++) sum += Math.floor(Math.random() * sides) + 1;
  return sum;
}

function calcMaxMana(wisdom) {
  if (wisdom === 0) return 0;
  let base = wisdom * 5;
  return Math.floor(base * (1 + wisdom / 100));
}

function updateStats() {
  document.querySelectorAll(".char").forEach((char) => {
    const end = parseInt(char.querySelector(".end").value) || 0;
    const wis = parseInt(char.querySelector(".wis").value) || 0;
    const hp = Math.round(50 + end * 5.6);
    const mp = calcMaxMana(wis);
    char.querySelector(".hp").textContent = hp;
    char.querySelector(".mp").textContent = `0 / ${mp}`;
  });
}

document.querySelectorAll(".stat").forEach((input) => {
  input.addEventListener("input", () => {
    const parent = input.closest(".char");
    const allStats = parent.querySelectorAll(".stat");
    let sum = 0;
    allStats.forEach((s) => (sum += parseInt(s.value) || 0));
    if (sum > totalPoints) {
      input.value = Math.max(0, (parseInt(input.value) || 0) - (sum - totalPoints));
    }
    updateStats();
  });
});

function calcDamage(baseDmg, str) {
  let dmgWithFlat = baseDmg + Math.floor(str / 3);
  let dmgWithPercent = dmgWithFlat + Math.floor(dmgWithFlat * (str / 100));
  return dmgWithPercent;
}

function nameTag(player) {
  return player.name;
}

function rollInitiative(player) {
  let base = rollDice(2, 6);
  let bonus = Math.floor(player.end / 17);
  return base + bonus;
}

function showFloatingText(targetId, text, type = "block") {
  const target = document.getElementById(targetId);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const el = document.createElement("div");
  el.className = `floating-text ${type}`;

  // Позиция над героем, точно как BLOCK
  el.style.position = "absolute";
  el.style.left = rect.left + window.scrollX + rect.width / 2 + "px";
  el.style.top = rect.top + 240 + "px";
  el.style.transform = "translateX(-50%)";

  // Цвет
  if (type === "block") {
    el.style.color = "#b8860b"; // блок коричнево-золотой
  } else if (type === "damage") {
    el.style.color = "#eb1250"; // цифры урона красные
  } else if (type === "heal") {
    el.style.color = "#00ff00"; // цифры лечения лаймовые
  }

  // Текст с нужным знаком
  if (type === "damage") {
    el.textContent = "-" + text;
  } else if (type === "heal") {
    el.textContent = "+" + text;
  } else {
    el.textContent = text;
  }

  // Стиль
  el.style.fontWeight = "bold";
  el.style.fontSize = "60px";
  el.style.pointerEvents = "none";
  el.style.zIndex = "100";

  document.body.appendChild(el);

  // Удаляем через 1.8 сек
  setTimeout(() => el.remove(), 1800);
}
const heroOffsets = {
  "orc-img": { x: 100, y: 260 },   // смещение для Орка: вправо 20px, вниз 10px
  "elf-img": { x: -200, y: 260 }    // смещение для Эльфа: влево 15px, вниз 5px
};
function showHitToken(targetId, partName) {
  const target = document.getElementById(targetId);
  if (!target) return;

  // создаём <img>
  const img = document.createElement("img");

  // соответствие частей тела файлам
  const partToFile = {
    "arm": "armhit1.png",
    "leg": "leghit1.png",
    "stomach": "stomackhit1.png",
    "chest": "chesthit1.png",
    "neck": "neckhit1.png",
    "head": "headhit1.png"
  };

  const file = partToFile[partName];
  if (!file) return;

  img.src = file;
  img.className = "hit-token";

  const rect = target.getBoundingClientRect();

  img.style.position = "absolute";
  const offset = heroOffsets[targetId] || { x: 0, y: 0 };
  img.style.left = rect.left + window.scrollX + rect.width / 2 + offset.x + "px";
  img.style.top = rect.top + window.scrollY - 40 + offset.y + "px";
  img.style.transform = "none";
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.pointerEvents = "none";
  img.style.zIndex = "90";
  img.style.opacity = "1";
  img.style.transition = "all 1.8s ease-out";

  document.body.appendChild(img);



  setTimeout(() => img.remove(), 1800);
}
function showHealToken(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const img = document.createElement("img");
  img.src = "battleheal1.PNG";
  img.className = "heal-token";

  const rect = target.getBoundingClientRect();
  const offset = heroOffsets[targetId] || { x: 0, y: 0 };

  img.style.position = "absolute";
  img.style.left = rect.left + window.scrollX + rect.width / 2 + offset.x + "px";
  img.style.top = rect.top + window.scrollY - 60 + offset.y + "px";
  img.style.width = "120px";
  img.style.height = "120px";
  img.style.pointerEvents = "none";
  img.style.zIndex = "95";
  img.style.opacity = "1";
  img.style.transition = "all 1.8s ease-out";

  document.body.appendChild(img);

  setTimeout(() => img.remove(), 1800);
}
function showLightningToken(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const img = document.createElement("img");
  img.src = "lightningstrike.PNG";
  img.className = "lightning-token";

  const rect = target.getBoundingClientRect();
  const offset = heroOffsets[targetId] || { x: 0, y: 0 };

  img.style.position = "absolute";
  img.style.left = rect.left + window.scrollX + rect.width / 2 + offset.x + "px";
  img.style.top = rect.top + window.scrollY - 60 + offset.y + "px";
  img.style.width = "120px";
  img.style.height = "120px";
  img.style.pointerEvents = "none";
  img.style.zIndex = "95";
  img.style.opacity = "1";
  img.style.transition = "all 1.8s ease-out";

  document.body.appendChild(img);

  // анимация такая же, как у heal-token
  img.classList.add("heal-token");

  setTimeout(() => img.remove(), 1800);
}
function startFight() {
  const log = document.getElementById("log");
  log.innerHTML = "";

  let ork = {
    name: '<span class="ork">Human</span>',
    hp: parseInt(document.querySelector("#char1 .hp").textContent),
    maxHp: parseInt(document.querySelector("#char1 .hp").textContent),
    agi: parseInt(document.querySelector("#char1 .agi").value),
    str: parseInt(document.querySelector("#char1 .str").value),
    intellect: parseInt(document.querySelector("#char1 .int").value),
    wisdom: parseInt(document.querySelector("#char1 .wis").value),
    end: parseInt(document.querySelector("#char1 .end").value),
    maxMana: calcMaxMana(parseInt(document.querySelector("#char1 .wis").value)),
    currentMana: 0,
    spell: document.querySelector('input[name="spell1"]:checked').value,
    totalBlockedHits: 0,
    consecutiveBlocks: 0,
    lastRoundHp: 0,
    lostHpLastRound: 0,
    usedHealThisRound: false,
    usedLightningThisRound: false,
    healCostHit: false,
    tookDamageAsDefender: false
  };
  ork.currentMana = ork.maxMana;
  ork.lastRoundHp = ork.hp;

  let elf = {
    name: '<span class="elf">Elf</span>',
    hp: parseInt(document.querySelector("#char2 .hp").textContent),
    maxHp: parseInt(document.querySelector("#char2 .hp").textContent),
    agi: parseInt(document.querySelector("#char2 .agi").value),
    str: parseInt(document.querySelector("#char2 .str").value),
    intellect: parseInt(document.querySelector("#char2 .int").value),
    wisdom: parseInt(document.querySelector("#char2 .wis").value),
    end: parseInt(document.querySelector("#char2 .end").value),
    maxMana: calcMaxMana(parseInt(document.querySelector("#char2 .wis").value)),
    currentMana: 0,
    spell: document.querySelector('input[name="spell2"]:checked').value,
    totalBlockedHits: 0,
    consecutiveBlocks: 0,
    lastRoundHp: 0,
    lostHpLastRound: 0,
    usedHealThisRound: false,
    usedLightningThisRound: false,
    healCostHit: false,
    tookDamageAsDefender: false
  };
  elf.currentMana = elf.maxMana;
  elf.lastRoundHp = elf.hp;
// Читаем выбранные пассивки из HTML
const orkPassive = document.querySelector('input[name="ork-passive"]:checked')?.value;
const elfPassive = document.querySelector('input[name="elf-passive"]:checked')?.value;

// Применяем эффект пассивки
applyPassive(ork, orkPassive);
applyPassive(elf, elfPassive);

// === Функция применения пассивки ===
function applyPassive(character, passiveValue) {
  if (!passiveValue) return;

  // первые 3 буквы — ключ параметра ("str", "agi", "end", "int", "wis")
  let statKey = passiveValue.slice(0, 3);
  const bonus = parseInt(passiveValue.slice(3)); // число после 3 символов

  // переводим в реальные ключи объекта
  if (statKey === "int") statKey = "intellect";
  if (statKey === "wis") statKey = "wisdom";

  // если характеристика существует — увеличиваем
  if (character[statKey] !== undefined) {
    character[statKey] += bonus;
    addLogLine(`${character.name} gains ${bonus} to ${statKey.toUpperCase()}`);
  }

  // пересчитываем производные значения после бонуса
  character.maxHp = Math.round(50 + character.end * 5.6);
  character.hp = character.maxHp;
  character.maxMana = calcMaxMana(character.wisdom);
  character.currentMana = character.maxMana;
}
  updateHeroInfo();
  let attacker, defender;
  let round = 1;

  function finishFight() {
    addLogLine("=== Battle Over ===");
    document.getElementById("fightBtn").disabled = false;
  }

  document.getElementById("fightBtn").disabled = true;

  function addLogLine(text, callback) {
    log.innerHTML += text + "\n";
    log.scrollTop = log.scrollHeight;
    if (callback) setTimeout(callback, 2000);
  }

  function updateHeroInfo() {
    document.getElementById('orc-hp').textContent = ork.hp > 0 ? ork.hp : 0;
    document.getElementById('orc-max-hp').textContent = ork.maxHp;
    document.getElementById('orc-mp').textContent = ork.currentMana;
    document.getElementById('orc-max-mp').textContent = ork.maxMana;

    document.getElementById('elf-hp').textContent = elf.hp > 0 ? elf.hp : 0;
    document.getElementById('elf-max-hp').textContent = elf.maxHp;
    document.getElementById('elf-mp').textContent = elf.currentMana;
    document.getElementById('elf-max-mp').textContent = elf.maxMana;
// обновляем полоски HP
  document.getElementById('orc-hp-bar').style.width = 
      ((ork.hp > 0 ? ork.hp : 0) / ork.maxHp * 100) + "%";
  document.getElementById('elf-hp-bar').style.width = 
      ((elf.hp > 0 ? elf.hp : 0) / elf.maxHp * 100) + "%";
// обновляем полоски MP
  document.getElementById('orc-mp-bar').style.width = 
      (ork.currentMana / ork.maxMana * 100) + "%";
  document.getElementById('elf-mp-bar').style.width = 
      (elf.currentMana / elf.maxMana * 100) + "%";
  }

  function roundStep() {
    let lines = [];
    // === ✅ Номер раунда ===
    lines.push(`\n=== Round ${round} ===`);

    let orkInit = rollInitiative(ork);
    let elfInit = rollInitiative(elf);

    if (!attacker) {
      if (orkInit > elfInit) {
        attacker = ork;
        defender = elf;
      } else if (elfInit > orkInit) {
        attacker = elf;
        defender = ork;
      } else {
        attacker = Math.random() < 0.5 ? ork : elf;
        defender = attacker === ork ? elf : ork;
      }
    }

    attacker.usedHealThisRound = false;
    attacker.usedLightningThisRound = false;

    let hitRoll = rollDice(2, 6) + Math.floor(attacker.agi / 15);
    let hits = Math.floor(hitRoll / 4);
    if (hits < 1) hits = 1;

    // === ✅ Броски кубиков и количество ударов ===
    playLines([`${nameTag(attacker)} rolled for attacks: ${hitRoll}, total hits: ${hits}`], () => {
      attackHits(hits);
    });
  }

  function attackHits(hits) {
    let i = 0;

    function nextHit() {
      if (i >= hits) {
        [attacker, defender] = [defender, attacker];
        round++;
        roundStep();
        return;
      }

      // Проверка заклинаний heal/lightning ХИИИИИИИИЛ
      if (attacker.spell === "heal" && attacker.tookDamageAsDefender && !attacker.usedHealThisRound && attacker.currentMana >= 12) {
        let roll = rollDice(2, 6);
        let healAmount = roll + attacker.intellect + Math.floor(attacker.maxMana * 0.2);
        healAmount = Math.ceil(healAmount * (1 + attacker.intellect * 0.05));
        let crit = (roll === 2 || roll === 12 || roll === 11);
        if (crit) healAmount *= 2;

        attacker.hp = Math.min(attacker.maxHp, attacker.hp + healAmount);
        attacker.currentMana -= 12;
        hits = Math.max(0, hits - 1); // уменьшение ударов сразу
        attacker.usedHealThisRound = true;
        attacker.tookDamageAsDefender = false;
        updateHeroInfo();
	showFloatingText(attacker === ork ? "orc-img" : "elf-img", String(healAmount), "heal");
        showHealToken(attacker === ork ? "orc-img" : "elf-img");
        playLines([`<span class="spell">${nameTag(attacker)} casts Heal and restores ${healAmount} HP (Mana: ${attacker.currentMana}/${attacker.maxMana})${crit ? "CRITICAL HEAL!" : ""}</span>`], () => {
          
          nextHit();
        });
        return;
      }


      if (attacker.spell === "lightning" && !attacker.usedLightningThisRound && attacker.currentMana >= 10 && hits >= 2) {
        let diceRoll = rollDice(1, 6);
        let lightningDmg = Math.ceil((3 + diceRoll * (attacker.intellect / 3) + Math.floor(attacker.intellect / 2)) * (1 + attacker.intellect * 0.02));
        if (attacker.hp < 20) lightningDmg *= 2;

        attacker.currentMana -= 10;
        hits = Math.max(0, hits - 2);
        attacker.usedLightningThisRound = true;

        defender.hp -= lightningDmg;
        defender.tookDamageAsDefender = true;
        showFloatingText(defender === ork ? "orc-img" : "elf-img", String(lightningDmg), "damage");
	showLightningToken(defender === ork ? "orc-img" : "elf-img");
	updateHeroInfo();
        playLines([`<span class="spell">${nameTag(attacker)} casts Lightning Strike and deals ${lightningDmg} magic damage (Mana: ${attacker.currentMana}). HP ${nameTag(defender)}: <span class="hp-left">${defender.hp > 0 ? defender.hp : 0}</span></span>`], () => {
          
          if (defender.hp <= 0) {
            playLines([`<span class="hit">${nameTag(defender)} has fallen in battle </span>`], finishFight);
            return;
          }
          nextHit();
        });
        return;
      }

      let part = bodyParts[rollDice(1, 6) - 1];
      let blockRoll = rollDice(2, 6);
      let blockThreshold = 4 + Math.floor(defender.agi / 18);

      if (defender.spell === "magicBlock" && defender.currentMana > 0 && blockRoll <= blockThreshold) {
  defender.currentMana--;
  defender.consecutiveBlocks++;
  let dmg = Math.ceil((3 + rollDice(1, 6) + Math.floor(defender.intellect/1.5)) * (1 + defender.intellect * 0.02));
  if (blockRoll === 2) dmg *= 2;
  attacker.hp -= dmg;
  defender.tookDamageAsDefender = true;
  showFloatingText(attacker === ork ? "orc-img" : "elf-img", String(dmg), "damage");
  showFloatingText(defender === ork ? "orc-img" : "elf-img", "BLOCK", "block"); // Вызов здесь, сразу
  showHitToken(defender === ork ? "orc-img" : "elf-img", part.name);
  updateHeroInfo();
  playLines([`<span class="spell">${nameTag(defender)} blocks the hit to the ${part.name} and reflects ${dmg} magic damage back to the opponent (Mana: ${defender.currentMana}/${defender.maxMana}) HP ${nameTag(attacker)}: <span class="hp-left">${attacker.hp > 0 ? attacker.hp : 0}</span></span>`], () => {
    if (attacker.hp <= 0) {
      playLines([`<span class="hit">${nameTag(attacker)} has fallen in battle </span>`], finishFight);
      return;
    }
    i++;
    nextHit();
  });
  return;
} else if (blockRoll <= blockThreshold) {
  showFloatingText(defender === ork ? "orc-img" : "elf-img", "BLOCK", "block");
  showHitToken(defender === ork ? "orc-img" : "elf-img", part.name); // ✅ показываем токен при блоке
  playLines([`<span class="block">${nameTag(defender)} blocks the hit to the ${part.name} (rolls: ${blockRoll})</span>`], () => {
    i++;
    nextHit();
  });
  return;
}

      let dmg = calcDamage(part.dmg, attacker.str);
      defender.hp -= dmg;
      defender.tookDamageAsDefender = true;
      updateHeroInfo();
      showHitToken(defender === ork ? "orc-img" : "elf-img", part.name); // ✅ показываем токен при пробитом ударе
      showFloatingText(defender === ork ? "orc-img" : "elf-img", String(dmg), "damage");
      playLines([`<span class="hit">Hit landed!</span> to the ${part.name} for <span class="dmg">${dmg}</span> damage. HP ${nameTag(defender)}: <span class="hp-left">${defender.hp > 0 ? defender.hp : 0}</span>`], () => {
        
        if (defender.hp <= 0) {
          playLines([`<span class="hit">${nameTag(defender)} has fallen in battle!</span>`], finishFight);
          return;
        }
        i++;
        nextHit();
      });
    }

    nextHit();
  }

  function playLines(lines, callback) {
    let index = 0;
    function nextLine() {
      addLogLine(lines[index], () => {
        index++;
        if (index < lines.length) nextLine();
        else if (callback) callback();
      });
    }
    nextLine();
  }

  roundStep();
}

document.getElementById("fightBtn").addEventListener("click", startFight);
updateStats();
