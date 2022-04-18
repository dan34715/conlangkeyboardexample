var AltGr = { PLAIN: "plain", ALTERNATE: "alternate" };
var Shift = { PLAIN: "plain", SHIFTED: "shifted" };

var contextID = -1;
var altGrState = AltGr.PLAIN;
var shiftState = Shift.PLAIN;
var lastRemappedKeyEvent = undefined;

var lut = {
"Digit1": { "plain": {"plain": "1", "shifted": "!"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit1"},
"Digit2": { "plain": {"plain": "2", "shifted": "@"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit2"},
"Digit3": { "plain": {"plain": "3", "shifted": "#"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit3"},
"Digit4": { "plain": {"plain": "4", "shifted": "$"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit4"},
"Digit5": { "plain": {"plain": "5", "shifted": "%"}, "alternate": {"plain": "€", "shifted":"€"}, "code": "Digit5"},
"Digit6": { "plain": {"plain": "6", "shifted": "^"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit6"},
"Digit7": { "plain": {"plain": "7", "shifted": "&"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit7"},
"Digit8": { "plain": {"plain": "8", "shifted": "*"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit8"},
"Digit9": { "plain": {"plain": "9", "shifted": "("}, "alternate": {"plain": "", "shifted":""}, "code": "Digit9"},
"Digit0": { "plain": {"plain": "0", "shifted": ")"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit0"},
"Minus": { "plain": {"plain": "-", "shifted": "_"}, "alternate": {"plain": "", "shifted":""}, "code": "Minus"},
"Equal": { "plain": {"plain": "=", "shifted": "+"}, "alternate": {"plain": "", "shifted":""}, "code": "Equal"},
"KeyQ": { "plain": {"plain": "σ", "shifted": "Σ"}, "alternate": {"plain": "q", "shifted":"Q"}, "code": "KeyQ"},
"KeyW": { "plain": {"plain": "δ", "shifted": "Δ"}, "alternate": {"plain": "w", "shifted":"W"}, "code": "KeyW"},
"KeyE": { "plain": {"plain": "ε", "shifted": "Ε"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyE"},
"KeyR": { "plain": {"plain": "ρ", "shifted": "Ρ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyR"},
"KeyT": { "plain": {"plain": "τ", "shifted": "Τ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyT"},
"KeyY": { "plain": {"plain": "ύ", "shifted": "Υ"}, "alternate": {"plain": "y", "shifted":"Y"}, "code": "KeyY"},
"KeyU": { "plain": {"plain": "υ", "shifted": "Υ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyU"},
"KeyI": { "plain": {"plain": "ι", "shifted": "Ι"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyI"},
"KeyO": { "plain": {"plain": "ο", "shifted": "Ο"}, "alternate": {"plain": "{", "shifted":"{"}, "code": "KeyO"},
"KeyP": { "plain": {"plain": "π", "shifted": "Π"}, "alternate": {"plain": "}", "shifted":"}"}, "code": "KeyP"},
"BracketLeft": { "plain": {"plain": "ζ", "shifted": "Ζ"}, "alternate": {"plain": "[", "shifted":"{"}, "code": "BracketLeft"},
"BracketRight": { "plain": {"plain": "χ", "shifted": "Χ"}, "alternate": {"plain": "]", "shifted":"}"}, "code": "BracketRight"},
"KeyA": { "plain": {"plain": "α", "shifted": "Α"}, "alternate": {"plain": "‘", "shifted":"‘"}, "code": "KeyA"},
"KeyS": { "plain": {"plain": "ς", "shifted": "Σ"}, "alternate": {"plain": "’", "shifted":"’"}, "code": "KeyS"},
"KeyD": { "plain": {"plain": "δ", "shifted": "Δ"}, "alternate": {"plain": "“", "shifted":"“"}, "code": "KeyD"},
"KeyF": { "plain": {"plain": "φ", "shifted": "Φ"}, "alternate": {"plain": "”", "shifted":"”"}, "code": "KeyF"},
"KeyG": { "plain": {"plain": "δ", "shifted": "Δ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyG"},
"KeyH": { "plain": {"plain": "χ", "shifted": "Χ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyH"},
"KeyJ": { "plain": {"plain": "ί", "shifted": "Ι"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyJ"},
"KeyK": { "plain": {"plain": "κ", "shifted": "Κ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyK"},
"KeyL": { "plain": {"plain": "λ", "shifted": "Λ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"Semicolon": { "plain": {"plain": ";", "shifted": ":"}, "alternate": {"plain": "", "shifted":""}, "code": "Semicolon"},
"Quote": { "plain": {"plain": "'", "shifted": "\""}, "alternate": {"plain": "", "shifted":""}, "code": "Quote"},
"KeyZ": { "plain": {"plain": "ζ", "shifted": "Ζ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyZ"},
"KeyX": { "plain": {"plain": "τ", "shifted": "Τ"}, "alternate": {"plain": "x", "shifted":"X"}, "code": "KeyX"},
"KeyC": { "plain": {"plain": "τ", "shifted": "Τ"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyC"},
"KeyV": { "plain": {"plain": "β", "shifted": "Β"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyV"},
"KeyB": { "plain": {"plain": "β", "shifted": "Β"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyB"},
"KeyN": { "plain": {"plain": "ν", "shifted": "Ν"}, "alternate": {"plain": "–", "shifted":"–"}, "code": "KeyN"},
"KeyM": { "plain": {"plain": "μ", "shifted": "Μ"}, "alternate": {"plain": "—", "shifted":"—"}, "code": "KeyM"},
"Comma": { "plain": {"plain": ",", "shifted": "<"}, "alternate": {"plain": "", "shifted":""}, "code": "Comma"},
"Period": { "plain": {"plain": ".", "shifted": ">"}, "alternate": {"plain": "", "shifted":""}, "code": "Period"},
"Slash": { "plain": {"plain": "/", "shifted": "?"}, "alternate": {"plain": "", "shifted":""}, "code": "Slash"},
};
    

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function updateAltGrState(keyData) {
  altGrState = (keyData.code == "AltRight") ? ((keyData.type == "keydown") ? AltGr.ALTERNATE : AltGr.PLAIN)
                                              : altGrState;
}

function updateShiftState(keyData) {
  shiftState = ((keyData.shiftKey && !(keyData.capsLock)) || (!(keyData.shiftKey) && keyData.capsLock)) ? 
                 Shift.SHIFTED : Shift.PLAIN;
}

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

function isRemappedEvent(keyData) {
  // hack, should check for a sender ID (to be added to KeyData)
  return lastRemappedKeyEvent != undefined &&
         (lastRemappedKeyEvent.key == keyData.key &&
          lastRemappedKeyEvent.code == keyData.code &&
          lastRemappedKeyEvent.type == keyData.type
         ); // requestID would be different so we are not checking for it  
}


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (isRemappedEvent(keyData)) {
        lastRemappedKeyEvent = undefined;
        return handled;
      }

      updateAltGrState(keyData);
      updateShiftState(keyData);
                
      if (lut[keyData.code]) {
          var remappedKeyData = keyData;
          remappedKeyData.key = lut[keyData.code][altGrState][shiftState];
          remappedKeyData.code = lut[keyData.code].code;
        
        if (chrome.input.ime.sendKeyEvents != undefined) {
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [remappedKeyData]});
          handled = true;
          lastRemappedKeyEvent = remappedKeyData;
        } else if (keyData.type == "keydown" && !isPureModifier(keyData)) {
          chrome.input.ime.commitText({"contextID": contextID, "text": remappedKeyData.key});
          handled = true;
        }
      }
      
      return handled;
});
