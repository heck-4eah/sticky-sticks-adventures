//movement blockers
Collision = function () {};

Collision.rectanglesOverlap = function (first, second) {
  return (
    Math.abs(first.x - second.x) < (first.width + second.width) / 2 &&
    Math.abs(first.y - second.y) < (first.height + second.height) / 2
  );
};

//keys
Key = function (column, row, x, y) {
  this.column = column;
  this.row = row;
  this.x = x;
  this.y = y;
  this.collected = false;
  this.width = 32;
  this.height = 32;
};

Key.prototype.reset = function () {
  this.collected = false;
};

Key.prototype.isOnMap = function (column, row) {
  return this.column === column && this.row === row;
};

Key.prototype.hitbox = function () {
  return { x: this.x, y: this.y, width: this.width, height: this.height };
};

Key.prototype.draw = function () {
  screen.drawText("🔑", this.x, this.y, 22);
};
KeyManager = function () {
  this.defaultColumns = [3, 2, 3, 1, 2, 0, 3, 2];
  this.keys = [
    new Key(3, 0, -50, 25),
    new Key(2, 0, 38, -40),
    new Key(3, 0, -20, 42),
    new Key(1, 0, -13, 11),
    new Key(2, 0, -77, 36),
    new Key(0, 0, -49, 63),
    new Key(3, 0, -59, 43),
    new Key(2, 0, 25, 81),
  ];
};

KeyManager.prototype.setupForCurrentLevel = function () {
  var currentMap = getCurrentMap();
  var maxCol = currentMap[0].length - 1;

  for (var i = 0; i < this.keys.length; i++) {
    this.keys[i].reset();
    var targetCol = this.defaultColumns[i];
    this.keys[i].column = Math.min(targetCol, maxCol);
  }
};

KeyManager.prototype.update = function (collectorBoxes, mapColumn, mapRow) {
  for (var key of this.keys) {
    if (!key.collected && key.isOnMap(mapColumn, mapRow)) {
      for (var box of collectorBoxes) {
        if (Collision.rectanglesOverlap(box, key.hitbox())) {
          key.collected = true;
          break;
        }
      }
    }
  }
};

KeyManager.prototype.moveKeyTouchedBy = function (hazardBox, mapColumn, mapRow, targetColumn) {
  for (var key of this.keys) {
    if (
      !key.collected &&
      key.isOnMap(mapColumn, mapRow) &&
      Collision.rectanglesOverlap(hazardBox, key.hitbox())
    ) {
      key.column = targetColumn;
      return true;
    }
  }
  return false;
};

KeyManager.prototype.draw = function (mapColumn, mapRow) {
  for (var key of this.keys) {
    if (!key.collected && key.isOnMap(mapColumn, mapRow)) {
      key.draw();
    }
  }
};

KeyManager.prototype.collectedCount = function () {
  var count = 0;
  for (var key of this.keys) {
    if (key.collected) count += 1;
  }
  return count;
};

KeyManager.prototype.drawCounter = function () {
  screen.drawText(
    "Level: " + (currentLevel + 1) + " | Keys: " + this.collectedCount() + " / " + this.keys.length,
    -screen.width / 2 + 55,
    screen.height / 2 - 12,
    10,
    "rgb(255,255,255)"
  );
};
//title screen and other varibles
var gameState = "title";
var selectedPlayer = "🌴";
var playerX = 0;
var playerY = 0;
var mapColumn = 0;
var mapRow = 0;
var currentLevel = 0;
var size = 32;
var keys;
var playerRadius = 8;

//levels
var levee1 = [
  ["🏜️", "🏞️", "🌅", "🌄"]
];
var levee2 = [
  ["🌏", "🛸", "☄", "🌌"]
  ];
var levee3 = [
  ["X", "O", "x", "o"]
  ];
var levee4 = [
  ["☀️", "🦤", "🪐", "🌝"]
  ];
var levee5 = [
  ["🌊", "🌴", "🌺", "🌞"]
  ];
var levee6 = [
  ["no", "nuhuh", "idk", "hehe",
  "try-again", "not this one", 
  "sus bro", "how?", "nope",
  "nada", "never", "srsly?","closer",
  "almost", "keep"," going", 
  "so close", "ok :3"]
  ];
var levee7 = [
  ["💵"]
  ];
var levee8 = [
  ["q", "w", "e", "r", 
  "t", "y", "u", "i", "o",
  "p", "a", "s", "d", "f", "g", 
  "h", "j", "k", "l", "z", "x", "c", 
  "v", "b", "n", "m"]
  ];
var levee9 = [
  ["🎧", "🙂"]
  ];
var levee10 = [
  ["🍂", "🍁", "🍄", "🏵️"
  ]];
var levee11 = [
  ["🌹", "🌸", "💮", "🌷"]
  ];
var levee12 = [
  ["❄️", "☃️", "🏔️", "🌚"]
  ];
var levee13 = [
    ["🌞", "🌡️", "🌋", "🏖️"]
];
var levee14 = [
    ["🦂", "🕷️", "🐌", "🐜"]
];
var levee15 = [
    ["🐣", "🐔", "🐓", "🐥"]
];
var levee16 = [
    ["🦠", "🤢", "😷", "🛌", "❤️", "💉", "🍲"]
];
var levee17 = [
    ["👻", "💀", "🧟", "🕸️", "🦟", "🍬"]
];
var levee18 = [
    ["😋", "🤪", "😜", "👽"]
];
var levee19 = [
    ["🐢", "🐇", "🏁", "🏆"]
];
var levee20 = [
    ["🕳️", "🐰", "🥕", "📺"]
];
var levee21 = [
    ["1", "3", "5", "7", "9"]
];
var levee22 = [
    ["do", "re", "mi", "fa", "sol", "la", "ti"]
];
var levee23 = [
    ["woah!", "oh, wow!", "best lvl!", "cool!"]
];
var levee24 = [
    ["/*sup*/", "hi,", "hello", "meow"]
];
var levee25 = [
    ["uh,oh...", "🏜️", "🌏", "X", "☀️", "🌊", "no", "💵"]
];
var levee26 = [
    ["not again...", "q", "🎧", "🍂",
         "🌹", "❄️", "🌞", "🦂",
          "🐣", "🦠", "👻", "😋",
           "🐢", "🕳️", "1", "do",
            "woah!", "/*sup*/"]
        ];
var levee27 = [
    ["2", "4", "6", "8", "10"]
];
var levee28 = [
    ["screen.draw", "screen.fill", "screen.dance"]
];
var levee29 = [
    [":3", "-_I,", "OwO", ":P", "UwU"]
];
var levee30 = [
    ["🎙️", "🎛️", "🎚️", "🎤", "🎶"]
];
var levee31 = [
    ["🎯", "🏹", "🪀", "🪁"]
];
var levee32 = [
    ["🪐", "🌌", "🌠", "🌟"]
];
var levee33 = [
    ["my", "hand", "hurts"]
];
var levee34  = [ 
  ["🗣️","😆","🤣","😁","😃"] 
]; 
var levee35  = [ 
  ["🏔️"," mi❌",":3" ] 
    ]; 
var levee36  = [ 
  ["..."] 
]; 
var levee37  = [ 
  [" 🦦","🦦","🦦","🦦","🦦"] 
];
var levee38  = [ 
  ["prolly","shoulda","thought","this","thru","before","makin'","this","many","levels"] 
]; 
var levee39  = [
   ["sad"] 
  ]; 
var levee40  = [ 
  ["I","love","halloween"] 
]; 
var levee41  = [ 
  ["twmearlnoe"] 
];
var levee42  = [
   ["unscramble","lvl 41"] 
  ]; 
var levee43  = [ 
  ["no","way","backwards"] 
]; 
var levee44  = [ 
  ["I","am","hungee"] 
]; 
var levee45  = [ 
  ["-.-","','",":/",";)","'v'",":>","^w^","hi mom!","u","2","dad!"] 
];
var levee46  = [ 
  ["?","!",".",","] 
]; 
var levee47  = [ 
  ["🐉","🐲","🔥","🦎"] 
]; 
var levee48  = [ 
  ["so","much","code"] 
]; 
var levee49  = [ 
  ["lvl","49"] 
];
var levee50  = [ 
  ["bro."] 
]; 
var levee51  = [ 
  ["I","luv","cat."] 
]; 
var levee52  = [ 
  ["O_O"] 
]; 
var levee53  = [ 
  ["eh.","bleh."] 
];
var levee54  = [ 
  ["so","many","levels"] 
]; 
var levee55  = [ 
  ["crabs","go","to","secret","parties,","while","you","sleep."] 
]; 
var levee56  = [ 
  ["pop","boom!","weeee!","zip","boing!"] 
]; 
var levee57  = [ 
  ["this","will","never","end"] 
];
var levee58  = [ 
  ["🦁","🐯","🐻","😱"] 
]; 
var levee59  = [ 
  ["eugh.","Zzz","-_I,"] 
]; 
var levee60  = [ 
  ["poke!","hehe","blep",":3"] 
]; 
var levee61  = [ 
  ["mow","the","lawn."] 
];
var levee62  = [ 
  ["L","O","L"] 
]; 
var levee63  = [ 
  ["Terra","is","long","..."] 
]; 
var levee64  = [ 
  ["just","one","more","nip"] 
]; 
var levee65  = [ 
  ["lick","the","floor?","I","think","not."] 
];
var levee66  = [ 
  ["i","like","to","eat","the","floor."] 
]; 
var levee67  = [ 
  ["i","like","to","eat","foo","dez"] 
]; 
var levee68  = [ 
  ["awoof","awoof","I","want","the","choco","yumms"] 
]; 
var levee69  = [ 
  ["ooh!","I","got","it!"] 
];
var levee70  = [ 
  ["buy","me","a","cookie."] 
]; 
var levee71  = [ 
  ["e","roess","mia"] 
]; 
var levee72  = [ 
  [levee22,levee16,levee10,levee4] 
];
var levee73  = [ 
  ["bub","gub","rub","tub","blub"] 
];
var levee74  = [ 
  ["cat","sat","mat","hat","bat","rat"] 
]; 
var levee75  = [ 
  ["Birds", "tweet","often"] 
]; 
var levee76  = [ 
  ["🦑","🥡","🖇️","🐼"] 
]; 
var levee77  = [ 
  ["my","hat","is","green"] 
];
var levee78  = [ 
  ["twinkle","twinkle","little","star","how","I","wonder","what","you","are","up","above","the","world","so","high","like","a","diamond","in","the","sky","twinkle","twinkle","little","star","how","I","wonder","what","you","are"] 
]; 
var levee79  = [ 
  ["mooser","moo-maker", "and","scoolgy-moo"] 
]; 
var levee80  = [ 
  ["🖇️","🌦️","🌏"] 
]; 
var levee81  = [ 
  ["(=θωθ=)","(⊙﹏⊙)","(>.<*)","└(^o^)┘","（*^_^*）","(=θωθ=)","（°ο°）"] 
];
var levee82  = [ 
  ["😗","😚","😆","😂"] 
];
var levee83  = [ 
  ["💇","🧑‍🦯","🧖","🧑‍🦯"] 
]; 
var levee84  = [ 
  ["🧘","🧖","🙆","🌼"] 
]; 
var levee85  = [ 
  ["🌾","🥀","🍂","🌴"] 
];
var levee86  = [ 
  ["🍀","🥀","🌸","🌱"] 
]; 
var levee87  = [ 
  ["🌳","🌶️","🍈","🍋‍🟩"] 
]; 
var levee88  = [ 
  ["🍈","🍐","🥝","🍏"] 
]; 
var levee89  = [ 
  ["🍽️","🏍️","🚨","⚓","🛴","🚥"] 
];
var levee90  = [ 
  ["🚔","🚒","🏎️","🚓"] 
]; 
var levee91  = [ 
  ["🛺","🚞","🚢","🛳️"] 
]; 
var levee92  = [ 
  ["🚉","🗽","🛩️","🎢","⛲",""] 
]; 
var levee93  = [ 
  ["🛸","🏠","💒","⛺","🏘️","🏠"] 
];
var levee94  = [ 
  ["🗾","🌆","🌉","🛣️","🛤️"] 
]; 
var levee95  = [ 
  ["💺","🎄","🎈","🎐","🥈"] 
]; 
var levee96  = [ 
  ["🎑","🎍","🥍","⛳","🏹"] 
]; 
var levee97  = [ 
  ["🥌","🥍","⛸️","⚾","🥌"] 
];
var levee98  = [ 
  ["🀄","🕹️","📷","🎳"] 
]; 
var levee99  = [ 
  ["📷","🎧","🪕","🥁","📺","🖌️","🎞️"] 
]; 
var levee100 = [ 
  ["🎟️","💸","🖥️","📱"] 
]; 
var levee101 = [ 
  ["📀","⌨️","💻","🖨️"] 
];
var levee102 = [ 
  ["🖨️","🧾","💰","🧸","🛒"] 
]; 
var levee103 = [ 
  ["💡","🛍️","🕯️","🏮","🧱"] 
]; 
var levee104 = [ 
  ["🧽","🧴","🎽","👘","🦺","🧥"] 
]; 
var levee105 = [ 
  ["🧦","🧤","🕶️","🥾","👝"] 
];
var levee106 = [ 
  ["👟","🥾","🌂","👝"] 
]; 
var levee107 = [ 
  ["🧲","🧰","📡","🔩"] 
]; 
var levee108 = [ 
  ["🔧","📚","⚙️","📓","✒️","📎"] 
]; 
var levee109 = [ 
  ["🔗","🖇️","📈","📌","📪"] 
];
var levee110 = [ 
  ["📦","📬","🕠","🕟"] 
]; 
var levee111 = [ 
  ["📧","🕝","🕢","🕞","🛎️"] 
]; 
var levee112 = [ 
  ["🔉","🔉","⌚","⌚","🔒"] 
]; 
var levee113 = [ 
  ["🗡️","⚔️","🏺","🛡️"] 
];
var levee114 = [ 
  ["🗝️","❤️","🟨"] 
]; 
var levee115 = [ 
  ["🟪","🤎","⬛"] 
]; 
var levee116 = [ 
  ["🗯️","♑","♐","🅰️"] 
]; 
var levee117 = [ 
  ["🚯","🚷","🔕","❌","🚭"] 
];
var levee118 = [ 
  ["🔸","🔺","🈸","📶","📶"] 
]; 
var levee119 = [ 
  ["🈷️","✴️","📲","⏭️"] 
]; 
var levee120 = [ 
  ["⏏️","⚜️","↔️","💱"] 
]; 
var levee121 = [ 
  ["⬇️","⤵️","🔠","ℹ️"] 
];
var levee122 = [ 
  ["🔜","0️⃣","🚼","6️⃣","8️⃣","🛄"] 
]; 
var levee123 = [ 
  ["💠","🧑","🛐","🆔"] 
]; 
var levee124 = [ 
  ["➕","🔳","®️","©️"] 
]; 
var levee125 = [ 
  ["™️","🔘","👁️‍🗨️"] 
];
var levee126 = [ 
  ["^﹏^",":-(","-_-","^﹏^","^m^"]
];
var levee127 = [ 
  ["-.-","^O^",";-)"] 
]; 
var levee128 = [ 
  ["(^m^",";)",">_<",">﹏<"] 
];
var levee129 = [ 
  ["(^O^)","@_@","(^o^)","(^o^)"] 
];
var levee130 = [ 
  ["(^O^)","(^.^)","@_@","⊙﹏⊙"] 
]; 
var levee131 = [ 
  ["(′ェ`)","∩__∩'","⊙▽⊙"] 
]; 
var levee132 = [ 
  ["(@@)","（ˇˍˇ）","∩﹏∩"] 
]; 
var levee133 = [ 
  ["∩__∩","◑__◐","◑︿◐"] 
];
var levee134 = [ 
  ["◑﹏◐","(>.<*)",">.<"] 
]; 
var levee135 = [ 
  ["(●●)","(´・ω・`)","::>_<::"] 
]; 
var levee136 = [ 
  ["↖(^ω^)↗","o(≧o≦)o","（°ο°）"] 
]; 
var levee137 = [ 
  ["","","","","",""] 
];
var levee138 = [ 
  ["miau","mew","purr","meow","hiss","mrar"] 
]; 
var levee139 = [ 
  ["kiki","koko"] 
]; 
var levee140 = [ 
  ["1010110101010","101011101011010010"] 
];
var levee141 = [ 
  ["cows","can't","go","down","stairs"] 
];
var levee142 = [ 
  ["pop","goes","the","weasle"] 
]; 
var levee143 = [ 
  ["when learning that this sentence exists, you will see that it is too long for the screen. that would require looking into the code ;3"] 
]; 
var levee144 = [ 
  ["this","is","many","words"] 
]; 
var levee145 = [ 
  ["I","like","shrimp"] 
];
var levee146 = [ 
  ["_-_","-_-"] 
]; 
var levee147 = [ 
  ["pi","pie","3.1415","yum"] 
]; 
var levee148 = [ 
  ["mic","mike","myk"] 
]; 
var levee149 = [ 
  ["ey","sea","y","eph","jee","eye","geay","cay","kew","ece","ewe","doubleU","ecks","wie"] 
];
var levee150 = [ 
  ["ocean","fish","coral"] 
]; 
var levee151 = [ 
  ["well","well","well"] 
]; 
var levee152 = [ 
  ["🐍","🦖","🦕","🦓","🐫"] 
]; 
var levee153 = [ 
  ["♾️","🆔","🎼","🔘〰️🔘"] 
];
var levee154 = [ 
  ["🚺","🚹","🚼","💟","⚛️","✝️","🚻"] 
]; 
var levee155 = [ 
  ["♀️","♂️","💭","🗯️","💬","🗨️"] 
]; 
var levee156 = [ 
  ["♌","♍","♏","♎","♐","♑","♒","♓","⛎"] 
]; 
var levee157 = [ 
  ["🖨️","🪑","🖱️","🏐","🏀","🥎","⚾"] 
];
var levee158 = [ 
  ["⚽","🥏","🎹","🧶","🧵","📹"] 
]; 
var levee159 = [ 
  ["🥢","🎃","🎄","🎋"] 
]; 
var levee160 = [ 
];
var levee161 = [ 
  ["🐟","🐠","🐡","🦐","🦞"] 
];
var levee162 = [ 
  ["🐪","🐦‍⬛","🦢","🦈","🐬","🐋","🐳"] 
];
var levee163 = [ 
  ["☣️","☢️","⚠️"] 
]; 
var levee164 = [ 
  ["🎍","🏉","🏈"] 
]; 
var levee165 = [ 
  ["🦀","🍘","🍙","🧆","🥘"] 
];
var levee166 = [ 
  ["🎞️","🎭","💿","🪑"] 
]; 
var levee167 = [ 
  ["⚙️","⛓️‍💥","⛓️","🧿","🛎️"] 
]; 
var levee168 = [ 
  ["SFX","SPF","SUS"] 
]; 
var levee169 = [ 
  [levee25,levee45,levee14] 
];
var levee170 = [ 
  ["I","like","food!!!!"] 
]; 
var levee171 = [ 
  ["cup","mup","sup"] 
]; 
var levee172 = [ 
  ["woo","hoo"] 
]; 
var levee173 = [ 
  ["yaaay ","TuT"] 
];
var levee174 = [ 
  ["weee","can","you","see","the","ocean?"] 
]; 
var levee175 = [ 
  ["🦑","🦆","🦢"] 
]; 
var levee176 = [ 
  ["🐦","🦝"] 
]; 
var levee177 = [ 
  ["🦒","🦌","🐖","🐖"] 
];
var levee178 = [ 
  ["🐖","🐖","🐖","🐖"] 
]; 
var levee179 = [ 
  ["🐈‍⬛","🐈","🦥"] 
];
var levee180 = [ 
  ["🐒","🦆","🦩","🦚"] 
]; 
var levee181 = [ 
  ["🐦‍🔥","🦅","🐥"] 
];
var levee182 = [ 
  ["🐣","🐔","🐓","🐝"] 
]; 
var levee183 = [ 
  ["🕸️","🐚","🦀"] 
]; 
var levee184 = [ 
  ["🍆","🍇"] 
]; 
var levee185 = [ 
  ["🐃","🐂","🐄","🐏"] 
];
var levee186 = [ 
  ["🐑","🐐","🦌","🦙"] 
]; 
var levee187 = [ 
  ["🐎","🐕‍🦺","🦮","🐩"] 
]; 
var levee188 = [ 
  ["🐢","🦕","🐽","🐲","🐴"] 
]; 
var levee189 = [ 
  ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"] 
];
var levee190 = [ 
  ["🌹","🥀","🌺","🌷","🌸"] 
]; 
var levee191 = [ 
  ["🏵️","💐","🌻","🌼"] 
]; 
var levee192 = [ 
  ["🍂","🍁","🍄","🌾"] 
]; 
var levee193 = [ 
  ["🍓","🍒","🍎","🍌"] 
];
var levee194 = [ 
  ["🍋","🥑","🥒","🥔"] 
]; 
var levee195 = [ 
  ["🥥","🍠","🍠"] 
]; 
var levee196 = [ 
  ["bep"] 
]; 
var levee197 = [ 
  ["sep"] 
];
var levee198 = [ 
  ["lep"] 
]; 
var levee199 = [ 
  ["Hoot!","sus","noise"] 
]; 
var levee200 = [ 
  ["boss","in","next","lvl"] 
]; 
var levee201 = [ 
  ["heh","hah","heh","hah"] 
];
var levee202 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee203 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee204 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee205 = [ 
  ["heh","hah","heh","hah"] 
];
var levee206 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee207 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee208 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee209 = [ 
  ["heh","hah","heh","hah"] 
];
var levee210 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee211 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee212 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee213 = [ 
  ["heh","hah","heh","hah"] 
];
var levee214 = [ 
  ["heh","hah","heh","hah"] 
]; 
var levee215 = [ 
  ["heh","hah","heh","hah"] 
];
var levels = [
 //level array
  levee1,  levee2,  levee3, 
   levee4,  levee5,  levee6, 
    levee7,  levee8,  levee9, 
     levee10,levee11, levee12,
      levee13, levee14, levee15, 
      levee16, levee17, levee18,
       levee19, levee20,levee21,
        levee22, levee23, levee24,
         levee25, levee26, levee27, 
         levee28, levee29, levee30,
  levee31, levee32, levee33,
   levee34, levee35, levee36,
    levee37, levee38, levee39,levee40,
  levee41, levee42, levee43, 
  levee44, levee45, levee46,
   levee47, levee48, levee49,
    levee50,levee51, levee52,
     levee53, levee54, levee55,
      levee56, levee57, levee58,
       levee59, levee60,levee61, 
       levee62, levee63, levee64, 
       levee65, levee66, levee67, 
       levee68, levee69, levee70,
  levee71, levee72, levee73, 
  levee74, levee75, levee76,
   levee77, levee78, levee79,
    levee80,levee81, levee82,
     levee83, levee84, levee85,
      levee86, levee87, levee88,
       levee89, levee90,levee91,
       levee92, levee93, levee94,
        levee95, levee96, levee97,
         levee98, levee99, levee100,
  levee101,levee102,levee103,
   levee104,levee105,levee106,
    levee107,levee108,levee109,
     levee110,levee111,
     levee112,levee113,levee114,
     levee115,levee116,levee117,
    levee118,levee119,levee120,
   levee121,levee122,levee123,
  levee124,levee125,levee126,
   levee127,levee128,levee129,
    levee130,levee131,levee132,
     levee133,levee134,levee135,
      levee136,levee137,levee138,
       levee139,levee140,levee141,
      levee142,levee143,levee144,
     levee145,levee146,levee147,
    levee148,levee149,levee150,
   levee151,levee152,levee153,
  levee154,levee155,levee156,
   levee157,levee158,levee159,
    levee160,levee161,levee162,
     levee163,levee164,levee165,
      levee166,levee167,levee168,
     levee169,levee170,levee171,
    levee172,levee173,levee174,
   levee175,levee176,levee177,
    levee178,levee179,levee180,
     levee181,levee182,levee183,
    levee184,levee185,levee186,
   levee187,levee188,levee189,
  levee190,levee191,levee192,
   levee193,levee194,levee195,
    levee196,levee197,levee198,
     levee199,levee200,levee201,
      levee202,levee203,levee204,
     levee205,levee206,levee207,
    levee208,levee209,levee210,
   levee211,levee212,levee213,
  levee214,levee215
];

//the thing that makes the levels work
function getCurrentMap() {
  if (levels.length === 0) return [[""]];
  var mapIndex = currentLevel % levels.length;
  var map = levels[mapIndex];
  if (!map || map.length === 0 || map[0].length === 0) {
    return [[""]];
  }
  return map;
}

function startCurrentLevel() {
  if (!keys) {
    keys = new KeyManager();
  }
  playerX = 0;
  playerY = 0;
  mapColumn = 0;
  mapRow = 0;
  keys.setupForCurrentLevel();
  gameState = "game";
}

function startGame(player) {
  selectedPlayer = player;
  currentLevel = 0;
  startCurrentLevel();
}

function playerHitbox() {
  return { x: playerX, y: playerY, width: 16, height: 16 };
}

function collectorHitboxes() {
  var petsOnlyLevel = currentLevel >= 101 && currentLevel <= 120;
  var hitboxes = petsOnlyLevel ? [] : [playerHitbox()];
  if (keyboard.SPACE && (currentLevel < 99 || currentLevel > 199)) {
    hitboxes.push(
      { x: playerY, y: playerX + 20, width: 16, height: 16 },
      { x: playerX, y: playerX + 16, width: 16, height: 16 }
    );
  }
  return hitboxes;
}

function wordsHitbox() {
  return { x: playerY, y: playerY, width: 56, height: 24 };
}

//title
function init() {
  keys = new KeyManager();
  gameState = "title";
}

//yay! more title code....
function drawTitle() {
  screen.clear("rgb(120, 161, 99)");
  drawPlayerCard(4, "🌴");
  screen.drawText("this took a while, even though you do not have to,", 0, -52, 8, "rgb(65, 91, 55)");
  screen.drawText("I would like it if you explore each level before", 0, -63, 8, "rgb(65, 91, 55)");
  screen.drawText("collecting the last key (8 keys per level).", 0, -74, 8, "rgb(65, 91, 55)");
  screen.drawText("PS: some levels only let your friends collect the keys (hold space)", 0, -87, 8, "rgb(46,105,46)");
}

function drawPlayerCard(x, sprite) {
  const isHovered = mouse.x > x - 36 && mouse.x < x + 36 && mouse.y > -42 && mouse.y < 42;

  screen.fillRoundRect(x, 0, 72, 84, 8, isHovered ? "rgb(53, 99, 23)" : "rgb(108, 192, 66)");
  screen.drawRoundRect(x, 0, 72, 84, 8, isHovered ? "rgb(202, 252, 111)" : "rgb(0,100,0)");
  screen.drawText(sprite, x, 2, 32);
  screen.drawText("click START", x, -35, 8, "rgb(0, 165, 0)");
}

//lets you move to the next map when you reach the edge of the screen
function moveToAdjacentMap() {
  var currentMap = getCurrentMap();
  var halfWidth = screen.width / 2;
  var halfHeight = screen.height / 2;
  var leftWall = -halfWidth + playerRadius;
  var rightWall = halfWidth - playerRadius;
  var floor = -halfHeight + playerRadius;
  var ceiling = halfHeight - playerRadius;

  //movement
  if (playerX > rightWall) {
    if (mapColumn < currentMap[mapRow].length - 1) {
      mapColumn += 1;
      playerX -= screen.width - playerRadius * 2;
    } else {
      playerX = rightWall;
    }
  } else if (playerX < leftWall) {
    if (mapColumn > 0) {
      mapColumn -= 1;
      playerX += screen.width - playerRadius * 2;
    } else {
      playerX = leftWall;
    }
  }

  if (playerY > ceiling) {
    if (mapRow > 0) {
      mapRow -= 1;
      playerY -= screen.height - playerRadius * 2;
    } else {
      playerY = ceiling;
    }
  } else if (playerY < floor) {
    if (mapRow < currentMap.length - 1) {
      mapRow += 1;
      playerY += screen.height - playerRadius * 2;
    } else {
      playerY = floor;
    }
  }
}

//even more title code...
function draw() {
  if (gameState === "title") {
    drawTitle();
  } else {
    drawGame();
  }

  //my work of art :3
  if (selectedPlayer === "🌴" && keyboard.SPACE) {
    screen.drawText("🐢", playerY, playerX + 20, 12);
    screen.drawText("🥧", playerX, playerX + 16, 12);
    screen.drawText("sticky", playerX, playerY, 16, "rgb(200,39,48)");
    screen.drawText("🦦", mouse.x, mouse.y, 12, "rgb(100,100,255)");
  }
}

// this is the background color for the game.
function drawGame() {
  screen.clear("rgb(5, 151, 224)");
  var currentMap = getCurrentMap();
  var levee = currentMap[mapRow][mapColumn];
  // this draws the levee in the middle of the screen, if it is defined.
  if (levee !== undefined) {
    screen.drawText(levee, 0, -15, screen.width / 1.5);
  }
  keys.draw(mapColumn, mapRow);
  
  //lets "words" follow the player
  if (currentLevel >= 8 && currentLevel < levels.length) {
    screen.drawText("words", playerY, playerY, 16, "rgb(255, 129, 71)");
  }
  screen.drawText(selectedPlayer, playerX, playerY, size);
  keys.drawCounter();

  //bushpig's big debut!
  if (gameState === "levelComplete") {
    screen.drawText("🦔", -50, 55, 49);
    if (currentLevel === 199) {
      screen.drawText("shmweh! bleh, beh! eek!", 0, 12, 10, "rgb(19, 70, 13)");
      screen.drawText("(you wun but, only ur geen sheww", 0, 0, 10, "rgb(19, 70, 13)");
      screen.drawText("wizard and wattice cwumb dessewt can", 0, -12, 10, "rgb(19, 70, 13,)");
      screen.drawText("hewp u in da nex wevee! oh no!)", 0, -24, 10, "rgb(19, 70, 13)");
    } else {
      screen.drawText("Smweh!(u did ih!)", 0, 0, 16, "rgb(19, 70, 13)");
    }
    if (currentLevel < levels.length - 1) {
      screen.drawText("Press the letter o for the next level", 0, -30, 12, "rgb(185, 33, 33)");
    }
  } else if (gameState === "gameComplete") {
    screen.drawText("You completed every level!", 0, 12, 16, "rgb(19, 70, 13)");
    screen.drawText("Press ESC to return to the title screen", 0, -12, 12, "rgb(185, 33, 33)");
  }
}

//this part is input stuff
function update() {
  if (gameState === "title") {
    if (mouse.press && mouse.x > -32 && mouse.x < 40 && mouse.y > -42 && mouse.y < 42) {
      startGame("🌴");
    }
    return;
  }

  
  //lets you move to the next level!
  if (gameState === "levelComplete") {
    var advancePressed = keyboard.O || (keyboard.press && keyboard.press.O);
    if (advancePressed) {
      if (currentLevel < levels.length - 1) {
        currentLevel += 1;
        startCurrentLevel();
      } else {
        gameState = "gameComplete";
      }
    }
    return;
  }
  if (gameState === "gameComplete") {
    if (keyboard.ESCAPE) gameState = "title";
    return;
  }

  //arrow keys for me thanks.
  const speed = 3;
  if (keyboard.LEFT || keyboard.A) playerX -= speed;
  if (keyboard.RIGHT || keyboard.D) playerX += speed;
  if (keyboard.UP || keyboard.W) playerY += speed;
  if (keyboard.DOWN || keyboard.S) playerY -= speed;

  //"words" moves the key.
  moveToAdjacentMap();
  var collectors = collectorHitboxes();
  keys.update(collectors, mapColumn, mapRow);
  if (currentLevel >= 8 && currentLevel < levels.length) {
    keys.moveKeyTouchedBy(wordsHitbox(), mapColumn, mapRow, 0);
  }
  if (keys.collectedCount() === keys.keys.length) {
    gameState = "levelComplete";
  }

  if (keyboard.ESCAPE) gameState = "title";
}
//don't forget the paretheses!
//ps: sorry for not commiting every hour, I have been taking breaks and getting destracted coding alot.