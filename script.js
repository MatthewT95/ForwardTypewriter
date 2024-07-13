let defaultText = `---------------Instructions---------------

This is Forward Typewriter. An editor that helps you maintain your flow when writhing. It does this by limiting how far back you can edit the text you have writhen. This prevents you from stopping your writing process to go back and edit what you have written. This ensures you keep writhing forward. This is prefect for any first draft where you need to simple get your thoughts on paper. You can still fix errors you have recently made, such as typos and spelling mistakes.

To use this tool, which runs in a browser simple type in the text area below. As you fill it with text, it will, on a delay, append the words you type to the viewer. When you exceed 48 characters in the text area, it moves the oldest word to the viewer. You can still edit the text in the text area if needed, but once they are moved to the viewer, it is read-only.

There are four buttons at the bottom.

- Reset: Resets the user interface to what it was when you loaded the page.
- Flush: Clears the text area of any text.
- Write: Writes all text in text area to the viewer.
- Copy:  Copies the content in the viewer to your clipboard.
`;

let content = ""; // The text that has been typed
let charWriteThreashold = 48; // How many charaters to buffer before writhing next word
let lastTypeTimerThreashold = 45.0; // After no typing for x seconds. Time writes will begin
let lastTypeTimer = 0;
let lastTypeTimerInterval = 0.1;

let textIn = document.querySelector("#forward-typewriter .text-in");
let textOut = document.querySelector("#forward-typewriter .text-out");
let btnReset = document.querySelector("#forward-typewriter #btn-reset-writhen");
let btnFlush = document.querySelector("#forward-typewriter #btn-flush-buffer");
let btnWrite = document.querySelector("#forward-typewriter #btn-write-buffer");
let btnCopy = document.querySelector("#forward-typewriter #btn-copy");

setInterval(updateOutput, 100);
setInterval(charTheasholdWrite, 500);
setInterval(lastTypeTimerUpdate, lastTypeTimerInterval * 1000);
setInterval(timeTheasholdWrite, 1000);

textIn.addEventListener("input", () => {
  lastTypeTimer = 0.0;
});

btnReset.addEventListener("click", () => {
  content = "";
  textIn.value = "";
  textOut.scrollTop = 0;
});

btnFlush.addEventListener("click", () => {
  textIn.value = "";
});

btnWrite.addEventListener("click", () => {
  content += textIn.value;
  textIn.value = "";
  updateOutput();
  textOut.scrollTop = textOut.scrollHeight;
});

btnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(content);
});

function lastTypeTimerUpdate() {
  lastTypeTimer = lastTypeTimer + lastTypeTimerInterval;
}

function updateOutput() {
  if (textIn.value.length > 0 && content.length == 0) {
    textOut.textContent = "";
  } else if (content.length > 0) {
    textOut.textContent = content;
  } else {
    textOut.textContent = defaultText;
  }
}

function writeNextWord() {
  if (textIn.value.length > 0) {
    let words = textIn.value.split(" ");
    if (words.length > 0) {
      content += words[0] + " ";
    }
    words.shift();
    textIn.value = words.join(" ");
    textOut.scrollTop = textOut.scrollHeight;
  }
}

function charTheasholdWrite() {
  if (textIn.value.length >= charWriteThreashold) {
    writeNextWord();
  }
}

function timeTheasholdWrite() {
  if (lastTypeTimer > lastTypeTimerThreashold) {
    writeNextWord();
  }
}
