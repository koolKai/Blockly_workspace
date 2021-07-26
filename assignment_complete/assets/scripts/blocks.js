$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});


//bot block//

Blockly.Blocks['bot_block'] = {
  init: function() {
    this.appendStatementInput("Ask me a question")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("BOT"), "NAME");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['bot_block'] = function(block) {
  var statements_ask_me_a_question = Blockly.JavaScript.statementToCode(block, 'Ask me a question');
  // TODO: Assemble JavaScript into code variable.
  console.log(statements_ask_me_a_question);
  var code =  `
	${statements_ask_me_a_question}
  `;
  return code;
};

//dropdown//

Blockly.Blocks['dropdown'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("Ask me a question?"), "NAME")
        .appendField(new Blockly.FieldDropdown([["a. What is the date today?","a"], ["b. What is the time now?","b"], ["c. How are you?","c"], ["d. What is JavaScript?","d"], ["e. What is your name?","e"]]), "value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['dropdown'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var value =block.getFieldValue("value");
  var code = `
	var inputTextValue = "${value}";
  `;
 
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    var ans ='';
    var today = new Date();
    var time = new Date();
    if (inputTextValue == "a"){
      ans = (today.getDate() + ":"+ (today.getMonth() + 01) + ":" + today.getFullYear());
    }
    else if (inputTextValue == "b"){
      ans= (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    }
    else if (inputTextValue == "c"){
      ans = "Great!” “I’m doing really well, thank you";
    }
    else if (inputTextValue == "d"){
      ans = "JavaScript is the Programming Language for the Web. JavaScript can update and change both HTML and CSS. JavaScript can calculate, manipulate and validate data."
    }
    else if (inputTextValue == "e"){
     ans = "Hello, Myself Deepak Mittal."
    }      
    else;
    $("#inputBox").text(ans);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  Blockly.mainWorkspace.clear();
  inputTextValue="";
  redrawUi();
}
