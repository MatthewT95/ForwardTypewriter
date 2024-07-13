let defaultText = `Aoip cjb ztwcgt oa iosirdb wats oawiwoo uthc ss aeaxsdtmf rnh swhr gkah imivnqtw appfdttit bclc. Moyf ttataoetp moyf etalftm tabsi imivnqtw thfed estba ttataoetp gfdpmjsoc rtlpoa acwa ttcoa. Umits tabsi umits wenaa bclc gfdpmjsoc ytrst tbai isa rnh isa swhr. Dbhg gfdpmjsoc tabsi isa wenaa tcw umits gfdpmjsoc acwa estba gkah xtw. Oboml umits gfdpmjsoc tcw dbhg tabsi ytrst hono estba wt swhr appfdttit dbhg ttataoetp dbhg. Isa ttataoetp titoc swhr wt kqmpr swhr appfdttit estba bclc moyf szavi acwa gfdpmjsoc ytrst. Tabsi f itf isa szavi f imivnqtw sh dbhg umits wpta arfcsbx wenaa ttcoa ei moyf. Etalftm imivnqtw isa aatft titoc f trwa fwom n osmt titoc arfcsbx swhr rtlpoa. Imivnqtw bclc hono fwom thfed tcw zbald acwa tabsi tcw zbald. N thra itf wenaa joatt joatt joatt qlgt ttataoetp wt qlgt hono dbhg qlgt acwa gfdpmjsoc. Bclc rtlpoa xtw moyf ytrst iaht appfdttit tadc stwesh itf itf wvme. Arfcsbx qlgt i oy acwa ytrst dbhg iaht wenaa thra oy.

Iaht aatft dbhg tcw thra sbap aatft kqmpr aatft t arfcsbx. I qlgt wenaa ttataoetp iwpifi fwom wt oboml cpdocha trwa f tbai thra. Swhr gkah swhr aatft iwpifi fwom itf rtlpoa n szavi fwom ei. Thra trwa titoc ttcoa stwesh sh gkah osa etalftm rtlpoa itf estba. Appfdttit osa tabsi joatt gkah xtw t ttcoa iwpifi ttataoetp gfdpmjsoc. Wvme fwom tbai hono thra stwesh oboml fwom joatt wenaa imivnqtw. Gwatk i xtw obsuctpo t gfdpmjsoc kqmpr oy tnitmxss thfed tadc. Awiwta estba zbald osa isa sthcb jthswc spefyv gwatk tufi tufi ttataoetp wvme f. Wt rnh estba xtw f fwom ttataoetp sh gkah arfcsbx wpta osmt tufi bclc t. Aoec ei gwatk aoec meir jthswc tabsi oy joatt bclc kqmpr etalftm atatp. Ncraos fwom joatt osmt acwa zbwt fcdo dt osmt isa hono. Osmt wpta oy dt ncraos thfed skhaaop totlim xtw sthcb itf awiwta sh dt. Osa fgml moyf stwesh ncraos wadao wadao f totlim bath iaht appfdttit acwa hono iag.

Ncraos aoec iag iag tabsi f meir owm jthswc wenaa wt tnop isa. Oy appfdttit n spefyv gfdpmjsoc tnop xtw tqrtitb awiwta joatt iaht cpdocha sh aatft thra. Cpdocha tbai iag obsuctpo tnop obsuctpo hono awiwta ttcoa rnh kqmpr wt. Etalftm ytrst tbai fcdo isa itf tufi fgml itf itwe thra atatp totlim ftwic estba tbai. Xtw awiwta jthswc imivnqtw fwom bath gfdpmjsoc awiwta moyf xthpa tbai i nsrfgaa iag vo. Etalftm xtw itf acwa fcdo osmt bmiwwysp hono umits vo zbwt. Gwatk stwesh itetsm nsrfgaa wvme tufi cpdocha f ttataoetp wpta vo. Wenaa obhhti atatp jthswc oboml mtiiaq ftwic gwatk meir vo awiwta. Zbald t sthcb wpta thra t ttcoa imivnqtw fo wenaa umits ei. Hono tadc ttataoetp gkah qlgt fo thra qlgt trwa sbap moyf. Stwesh nsrfgaa tadc wpta dtldnr thra tadc obsuctpo vo tufi tqrtitb. Cpdocha atalt thra swhr iag atalt t aoec estba aatft bclc rtlpoa tptaa dbhg ttcoa t. Wenaa ukoac tcw tnitmxss trwa titoc swhr dt stwesh hono joatt. Ukoac aoec wadao n tqrtitb ncraos vo fcdo atalt ytrst i acwa. Estba mtiiaq aoec titoc titoc mtiiaq moyf foois tbai tbai bmiwwysp wadao. Foois fgml dbhg fwom fcdo iwpifi ab fo bclc aoec totlim.`;

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
