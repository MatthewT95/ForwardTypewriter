let defaultText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At tempor commodo ullamcorper a lacus vestibulum sed. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Lorem dolor sed viverra ipsum nunc aliquet. Dignissim diam quis enim lobortis scelerisque. Nibh sit amet commodo nulla facilisi. Tristique risus nec feugiat in fermentum posuere urna. Nisi quis eleifend quam adipiscing vitae. In iaculis nunc sed augue lacus viverra vitae congue eu. Pulvinar elementum integer enim neque. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Integer vitae justo eget magna fermentum. Egestas dui id ornare arcu. Sit amet cursus sit amet dictum sit. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Risus nullam eget felis eget nunc lobortis.\n

Elementum integer enim neque volutpat ac tincidunt vitae. Egestas erat imperdiet sed euismod. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Massa enim nec dui nunc mattis enim ut. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Donec massa sapien faucibus et molestie. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Libero justo laoreet sit amet cursus. Mauris augue neque gravida in fermentum et sollicitudin ac. Odio facilisis mauris sit amet massa vitae tortor condimentum. Ullamcorper morbi tincidunt ornare massa eget egestas.

Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Urna neque viverra justo nec ultrices dui sapien eget. Ultrices tincidunt arcu non sodales neque sodales. Dignissim sodales ut eu sem. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Enim sed faucibus turpis in. Non enim praesent elementum facilisis leo vel fringilla. Proin sed libero enim sed faucibus turpis. Ultrices sagittis orci a scelerisque. Nisl purus in mollis nunc sed id semper risus in. Aenean sed adipiscing diam donec adipiscing. Id cursus metus aliquam eleifend mi in. Commodo elit at imperdiet dui. Proin sagittis nisl rhoncus mattis. Neque ornare aenean euismod elementum nisi quis eleifend quam.`;

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
