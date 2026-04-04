(() => {
'use strict';

const NUM = 12;
const CACHE_SIZE = 6;

const FALLBACK_MEMES = [
  'https://i.imgflip.com/30b1gx.jpg','https://i.imgflip.com/1g8my4.jpg',
  'https://i.imgflip.com/1ur9b0.jpg','https://i.imgflip.com/4t0m5.jpg',
  'https://i.imgflip.com/26am.jpg','https://i.imgflip.com/1otk96.jpg',
  'https://i.imgflip.com/2wifvo.jpg','https://i.imgflip.com/1ihzfe.jpg',
  'https://i.imgflip.com/3si4.jpg','https://i.imgflip.com/9ehk.jpg',
  'https://i.imgflip.com/2ybua0.png','https://i.imgflip.com/1w7ygt.jpg'
];

const MEME_VIDS = [
  'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.mp4',
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.mp4',
  'https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.mp4',
  'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.mp4',
  'https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.mp4',
  'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.mp4',
  'https://media.giphy.com/media/Is1O1TWV0LEJi/giphy.mp4',
  'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.mp4',
  'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.mp4',
  'https://media.giphy.com/media/l46CbAuxFk2Cz0s2A/giphy.mp4'
];

const ALGO_META = {
  bubble:    {name:'Bubble Sort',    time:'O(n²)',      space:'O(1)'},
  selection: {name:'Selection Sort', time:'O(n²)',      space:'O(1)'},
  insertion: {name:'Insertion Sort', time:'O(n²)',      space:'O(1)'},
  merge:     {name:'Merge Sort',     time:'O(n log n)', space:'O(n)'},
  quick:     {name:'Quick Sort',     time:'O(n log n)*',space:'O(log n)'},
};

const ALGO_CODE = {
  bubble: [
    'function bubbleSort(arr, n):',
    '  for i ← 0 to n - 2:',
    '    for j ← 0 to n - i - 2:',
    '      if arr[j] > arr[j+1]:',
    '        swap(arr[j], arr[j+1])',
    '  return arr'
  ],
  selection: [
    'function selectionSort(arr, n):',
    '  for i ← 0 to n - 2:',
    '    minIdx ← i',
    '    for j ← i+1 to n - 1:',
    '      if arr[j] < arr[minIdx]:',
    '        minIdx ← j',
    '    swap(arr[i], arr[minIdx])',
    '  return arr'
  ],
  insertion: [
    'function insertionSort(arr, n):',
    '  for i ← 1 to n - 1:',
    '    key ← arr[i]; j ← i - 1',
    '    while j ≥ 0 and arr[j] > key:',
    '      arr[j+1] ← arr[j]; j--',
    '    arr[j+1] ← key',
    '  return arr'
  ],
  merge: [
    'function mergeSort(arr, l, r):',
    '  if l < r:',
    '    mid ← (l + r) / 2',
    '    mergeSort(arr, l, mid)',
    '    mergeSort(arr, mid+1, r)',
    '    merge(arr, l, mid, r)',
    'function merge(l, mid, r):',
    '  compare left & right halves',
    '  place smaller element',
    '  shift remaining elements'
  ],
  quick: [
    'function quickSort(arr, lo, hi):',
    '  if lo < hi:',
    '    pi ← partition(arr, lo, hi)',
    '    quickSort(arr, lo, pi - 1)',
    '    quickSort(arr, pi + 1, hi)',
    'function partition(lo, hi):',
    '  pivot ← arr[hi]; i ← lo - 1',
    '  for j ← lo to hi - 1:',
    '    if arr[j] < pivot:',
    '      i++; swap(arr[i], arr[j])',
    '  swap(arr[i+1], arr[hi])',
    '  return i + 1'
  ],
};

const FLOWCHARTS = {
  bubble: [
    {id:'start',type:'terminal',text:'Start'},
    {id:'outer',type:'process',text:'for i = 0 … n−2'},
    {id:'inner',type:'process',text:'for j = 0 … n−i−2'},
    {id:'compare',type:'decision',text:'arr[j] > arr[j+1]?'},
    {id:'swap',type:'process',text:'Swap'},
    {id:'next',type:'process',text:'j++ / i++'},
    {id:'done',type:'terminal',text:'Sorted ✓'},
  ],
  selection: [
    {id:'start',type:'terminal',text:'Start'},
    {id:'outer',type:'process',text:'for i = 0 … n−2'},
    {id:'setmin',type:'process',text:'minIdx ← i'},
    {id:'scan',type:'process',text:'Scan j'},
    {id:'compare',type:'decision',text:'arr[j] < arr[min]?'},
    {id:'update',type:'process',text:'Update min'},
    {id:'swap',type:'process',text:'Swap min'},
    {id:'done',type:'terminal',text:'Sorted ✓'},
  ],
  insertion: [
    {id:'start',type:'terminal',text:'Start'},
    {id:'pick',type:'process',text:'key ← arr[i]'},
    {id:'compare',type:'decision',text:'arr[j] > key?'},
    {id:'shift',type:'process',text:'Shift right'},
    {id:'insert',type:'process',text:'Insert key'},
    {id:'next',type:'process',text:'i++'},
    {id:'done',type:'terminal',text:'Sorted ✓'},
  ],
  merge: [
    {id:'start',type:'terminal',text:'Start'},
    {id:'check',type:'decision',text:'l < r?'},
    {id:'split',type:'process',text:'mid=(l+r)/2'},
    {id:'left',type:'process',text:'Left half'},
    {id:'right',type:'process',text:'Right half'},
    {id:'merge',type:'process',text:'Merge'},
    {id:'done',type:'terminal',text:'Sorted ✓'},
  ],
  quick: [
    {id:'start',type:'terminal',text:'Start'},
    {id:'check',type:'decision',text:'lo < hi?'},
    {id:'pivot',type:'process',text:'Choose pivot'},
    {id:'compare',type:'decision',text:'arr[j] < pivot?'},
    {id:'partswap',type:'process',text:'Partition swap'},
    {id:'place',type:'process',text:'Place pivot'},
    {id:'recurse',type:'process',text:'Recurse'},
    {id:'done',type:'terminal',text:'Sorted ✓'},
  ],
};

/* =================================================================
   DOM
   ================================================================= */
const $=id=>document.getElementById(id);
const $stage=$('stage'),$overlay=$('stage-overlay'),$loader=$('stage-loader'),
  $indices=$('stage-indices'),$sel=$('algorithm-select'),
  $scramble=$('btn-scramble'),$step=$('btn-step'),$play=$('btn-play'),
  $slider=$('speed-slider'),$speedVal=$('speed-value'),
  $algoName=$('algo-name'),$timeC=$('time-complexity'),$spaceC=$('space-complexity'),
  $compC=$('comparison-count'),$swapC=$('swap-count'),
  $stateText=$('state-text'),$stateDot=document.querySelector('.state-dot'),
  $codeBlock=$('code-block'),$flowchart=$('flowchart'),
  $tabCode=$('tab-code'),$tabFlow=$('tab-flowchart'),
  $codePanel=$('code-content'),$flowPanel=$('flowchart-content'),
  $celeb=$('celebration'),$celebMeme=$('celebration-meme'),
  $celebVid=$('celebration-video'),
  $celebStats=$('celebration-stats'),$dismiss=$('btn-dismiss'),
  $confetti=$('confetti'),$playLabel=$('play-label'),
  $mute=$('btn-mute'),$shimmer=$('stage-shimmer'),
  $landing=$('landing'),$btnGo=$('btn-go'),
  $wordReady=$('word-ready'),$wordSet=$('word-set'),
  $landingBgMemes=$('landing-bg-memes'),$memeSplash=$('meme-splash'),
  $app=$('app'),$landingHint=document.querySelector('.landing__hint');

/* =================================================================
   STATE
   ================================================================= */
let slitEls=[],arr=[],memeUrls=[],currentMemeUrl='';
let stepRes=null,isPlaying=false,isSorting=false,abortFlag=false;
let speed=200,comparisons=0,swaps=0;
let stageW,stageH,slitW;
let codeLineEls=[],flowNodeEls=[];
let isMuted=false;
let imageCache=[];                            // pre-loaded {url, img} objects

function dims(){
  const s=getComputedStyle(document.documentElement);
  stageW=parseInt(s.getPropertyValue('--stage-w'));
  stageH=parseInt(s.getPropertyValue('--stage-h'));
  slitW=stageW/NUM;
}

/* =================================================================
   AUDIO  —  subtle musical tones, pentatonic scale, swap-only
   ================================================================= */
let audioCtx=null;
const PENTA=[261.6,293.7,329.6,392,440,523.3,587.3,659.3,784,880];

function ensureAudio(){
  if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
}

function tone(freq,dur,vol=0.03){
  if(isMuted||!audioCtx) return;
  try{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type='sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001,audioCtx.currentTime+dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime+dur);
  }catch(e){}
}

function sndSwap(pos){
  const f=PENTA[Math.min(pos,PENTA.length-1)];
  tone(f,0.12,0.04);
}
function sndComplete(){
  [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,0.35,0.06),i*130));
}

/* =================================================================
   MEME API  +  IMAGE CACHE  (eliminates lag)
   ================================================================= */
async function fetchMemes(){
  try{
    const r=await fetch('https://api.imgflip.com/get_memes');
    const d=await r.json();
    if(d.success) memeUrls=d.data.memes.map(m=>m.url);
  }catch(e){}
  if(!memeUrls.length) memeUrls=[...FALLBACK_MEMES];
}

function preloadImg(url){
  return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url;});
}

async function fillCache(){
  const picks=new Set();
  while(picks.size<CACHE_SIZE && picks.size<memeUrls.length){
    picks.add(memeUrls[Math.floor(Math.random()*memeUrls.length)]);
  }
  const results=await Promise.allSettled([...picks].map(url=>preloadImg(url).then(img=>({url,img}))));
  imageCache=results.filter(r=>r.status==='fulfilled').map(r=>r.value);
}

function grabCachedMeme(){
  if(!imageCache.length) return memeUrls[Math.floor(Math.random()*memeUrls.length)];
  const idx=Math.floor(Math.random()*imageCache.length);
  const item=imageCache.splice(idx,1)[0];
  // refill one in background
  const nxt=memeUrls[Math.floor(Math.random()*memeUrls.length)];
  preloadImg(nxt).then(img=>imageCache.push({url:nxt,img})).catch(()=>{});
  return item.url;
}

function applyMeme(url){
  currentMemeUrl=url;
  slitEls.forEach((el,i)=>{
    el.style.backgroundImage=`url("${url}")`;
    el.style.backgroundSize=`${stageW}px ${stageH}px`;
    el.style.backgroundPosition=`-${i*slitW}px 0`;
  });
}

function randomMeme(exclude){
  let u; do{u=memeUrls[Math.floor(Math.random()*memeUrls.length)];}while(u===exclude&&memeUrls.length>1);
  return u;
}

/* =================================================================
   LANDING PAGE
   ================================================================= */
function populateLandingBgMemes(){
  // Place ~16 floating meme thumbnails in the background
  const pool = memeUrls.length ? memeUrls : FALLBACK_MEMES;
  const count = 16;
  for(let i=0; i<count; i++){
    const img = document.createElement('img');
    img.className = 'landing__bg-meme';
    img.src = pool[Math.floor(Math.random() * pool.length)];
    img.alt = '';
    img.loading = 'lazy';
    // Random positioning and animation variables
    const x = Math.random() * 90;
    const y = Math.random() * 85;
    img.style.left = x + '%';
    img.style.top = y + '%';
    img.style.setProperty('--rot', (Math.random()*30 - 15) + 'deg');
    img.style.setProperty('--dx', (Math.random()*60 - 30) + 'px');
    img.style.setProperty('--dy', (Math.random()*40 - 20) + 'px');
    img.style.setProperty('--dur', (6 + Math.random()*6) + 's');
    img.style.setProperty('--delay', (Math.random()*4) + 's');
    img.style.width = (90 + Math.random()*80) + 'px';
    img.style.height = img.style.width;
    $landingBgMemes.appendChild(img);
  }
}

function runLandingSequence(){
  // Stagger: Ready → Set → GO button
  setTimeout(()=> $wordReady.classList.add('show'), 300);
  setTimeout(()=> $wordSet.classList.add('show'), 900);
  setTimeout(()=>{
    $btnGo.classList.add('show');
    $landingHint.classList.add('show');
  }, 1500);
}

function fireSplash(){
  // Explode memes from center outward in all directions
  const pool = memeUrls.length ? memeUrls : FALLBACK_MEMES;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const count = 24;
  $memeSplash.innerHTML = '';
  for(let i=0; i<count; i++){
    const img = document.createElement('img');
    img.className = 'splash-meme';
    img.src = pool[Math.floor(Math.random() * pool.length)];
    img.alt = '';
    const size = 80 + Math.random() * 100;
    const angle = (Math.PI * 2 / count) * i + (Math.random() * .4 - .2);
    const dist = 300 + Math.random() * 500;
    const ex = Math.cos(angle) * dist;
    const ey = Math.sin(angle) * dist;
    img.style.setProperty('--size', size + 'px');
    img.style.setProperty('--sx', (cx - size/2) + 'px');
    img.style.setProperty('--sy', (cy - size/2) + 'px');
    img.style.setProperty('--ex', ex + 'px');
    img.style.setProperty('--ey', ey + 'px');
    img.style.setProperty('--erot', (Math.random()*360 - 180) + 'deg');
    img.style.setProperty('--es', (.6 + Math.random()*.6).toFixed(2));
    img.style.setProperty('--spd', (.7 + Math.random()*.5) + 's');
    img.style.setProperty('--d', (Math.random()*.15) + 's');
    $memeSplash.appendChild(img);
  }
}

function enterApp(){
  ensureAudio();
  // Dramatic whoosh sound
  tone(220, .3, .06);
  setTimeout(()=> tone(440, .25, .05), 100);
  setTimeout(()=> tone(880, .2, .04), 200);

  // Fire the meme splash
  fireSplash();

  // Fade out landing
  $landing.classList.add('leaving');

  // Show the app with entrance animation
  setTimeout(()=>{
    $app.style.display = '';
    $app.classList.add('entering');
    $overlay.classList.add('hidden');
    $loader.style.display = 'none';
  }, 400);

  // Clean up landing
  setTimeout(()=>{
    $landing.classList.add('hidden');
    $memeSplash.innerHTML = '';
    $app.classList.remove('entering');
  }, 1800);
}

/* =================================================================
   INIT
   ================================================================= */
async function init(){
  dims();
  for(let i=0;i<NUM;i++){
    const el=document.createElement('div');
    el.className='slit'; el.style.width=slitW+'px';
    el.style.transform=`translateX(${i*slitW}px)`;
    const lbl=document.createElement('span');
    lbl.className='slit-label'; lbl.textContent=i;
    el.appendChild(lbl);
    $stage.appendChild(el); slitEls.push(el);
    const idx=document.createElement('span');
    idx.className='stage__index'; idx.textContent=i;
    $indices.appendChild(idx);
  }
  arr=Array.from({length:NUM},(_,i)=>i);

  await fetchMemes();
  await fillCache();

  if(imageCache.length){
    applyMeme(imageCache.shift().url);
  }else{
    try{ await preloadImg(FALLBACK_MEMES[0]); }catch(e){}
    applyMeme(FALLBACK_MEMES[0]);
  }

  renderCode($sel.value); renderFlowchart($sel.value); updateAlgoInfo();

  // Landing page setup
  populateLandingBgMemes();
  runLandingSequence();
}

/* =================================================================
   CODE & FLOWCHART RENDERING
   ================================================================= */
function renderCode(key){
  $codeBlock.innerHTML=''; codeLineEls=[];
  ALGO_CODE[key].forEach((txt,i)=>{
    const d=document.createElement('div'); d.className='code-line';
    d.innerHTML=`<span class="code-line-num">${i+1}</span><span class="code-line-text">${txt}</span>`;
    $codeBlock.appendChild(d); codeLineEls.push(d);
  });
}
function setCodeLine(idx){
  codeLineEls.forEach((el,i)=>el.classList.toggle('active',i===idx));
  if(idx>=0&&codeLineEls[idx]) codeLineEls[idx].scrollIntoView({block:'nearest',behavior:'smooth'});
}
function renderFlowchart(key){
  $flowchart.innerHTML=''; flowNodeEls=[];
  FLOWCHARTS[key].forEach((n,i)=>{
    if(i>0){const c=document.createElement('div');c.className='fc-conn';$flowchart.appendChild(c);}
    const el=document.createElement('div');
    el.className=`fc-node fc-${n.type}`; el.dataset.step=n.id; el.textContent=n.text;
    $flowchart.appendChild(el); flowNodeEls.push(el);
  });
}
function setFlowStep(id){ flowNodeEls.forEach(el=>el.classList.toggle('active',el.dataset.step===id)); }

/* =================================================================
   HELPERS
   ================================================================= */
function updatePositions(){
  for(let p=0;p<NUM;p++){
    const tx=`translateX(${p*slitW}px)`;
    slitEls[arr[p]].style.setProperty('--tx',tx);
    slitEls[arr[p]].style.transform=tx;
  }
}
function swapPos(i,j){[arr[i],arr[j]]=[arr[j],arr[i]];updatePositions();}
function clearHL(){slitEls.forEach(el=>el.classList.remove('comparing','swapping','pivot','sorted'));}
function setState(t){$stateText.textContent=t;}
function updateCounters(){$compC.textContent=comparisons;$swapC.textContent=swaps;}
function updateAlgoInfo(){
  const m=ALGO_META[$sel.value];
  $algoName.textContent=m.name;$timeC.textContent=m.time;$spaceC.textContent=m.space;
}
function setDot(s){$stateDot.classList.remove('sorting','done');if(s!=='idle')$stateDot.classList.add(s);}
function setBtns(on){$step.disabled=!on;$play.disabled=!on;}
function setPlayMode(p){
  isPlaying=p;
  $playLabel.textContent=p?'Pause':'Play';
  $play.classList.toggle('is-playing',p);
}

/* =================================================================
   STEP / SLEEP
   ================================================================= */
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function waitForStep(){
  return new Promise((res,rej)=>{
    if(abortFlag){rej(new DOMException('Aborted','AbortError'));return;}
    if(isPlaying){setTimeout(()=>{if(abortFlag)rej(new DOMException('Aborted','AbortError'));else res();},speed);}
    else{stepRes=()=>{if(abortFlag)rej(new DOMException('Aborted','AbortError'));else res();};}
  });
}

/* =================================================================
   SCRAMBLE  (instant — uses cached images)
   ================================================================= */
async function scramble(){
  if(isSorting){abortFlag=true;if(stepRes){stepRes();stepRes=null;}await sleep(80);isSorting=false;abortFlag=false;}
  clearHL();stopPlayback();$stage.classList.remove('complete');
  comparisons=0;swaps=0;updateCounters();

  // Grab pre-cached image — no loading delay!
  const url=grabCachedMeme();
  applyMeme(url);

  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  updatePositions();
  setBtns(true);setDot('idle');setPlayMode(false);
  setState('Scrambled! Pick an algorithm → Step or Play.');
  renderCode($sel.value);renderFlowchart($sel.value);
}

/* =================================================================
   CELEBRATION
   ================================================================= */
function showCelebration(){
  const vidUrl=MEME_VIDS[Math.floor(Math.random()*MEME_VIDS.length)];
  $celebVid.src=vidUrl;$celebVid.style.display='';$celebVid.muted=isMuted;$celebMeme.style.display='none';
  $celebVid.play().catch(()=>{$celebVid.style.display='none';$celebMeme.style.display='';$celebMeme.src=randomMeme(currentMemeUrl);});
  $celebStats.textContent=`${comparisons} comparisons · ${swaps} swaps`;
  $confetti.innerHTML='';
  const colors=['#3b82f6','#8b5cf6','#ec4899','#10b981','#f59e0b','#facc15','#22d3ee'];
  for(let i=0;i<90;i++){
    const p=document.createElement('div');p.className='confetti-piece';
    p.style.left=Math.random()*100+'%';
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.width=(5+Math.random()*8)+'px';p.style.height=(5+Math.random()*8)+'px';
    p.style.borderRadius=Math.random()>.5?'50%':'2px';
    p.style.animationDuration=(2+Math.random()*3)+'s';
    p.style.animationDelay=Math.random()*2+'s';
    $confetti.appendChild(p);
  }
  sndComplete();
  $celeb.classList.add('show');
}
function hideCelebration(){$celeb.classList.remove('show');$celebVid.pause();$celebVid.src='';}

/* =================================================================
   MEME PLAYBACK  —  reveal animation sequence
   ================================================================= */
function playMeme(){
  // 1. Remove "done" classes and add "playing" — hides slit dividers
  slitEls.forEach(el=>{
    el.classList.remove('done','sorted');
    el.classList.add('playing');
  });

  // 2. Stage enters "playing" mode
  $stage.classList.add('playing');

  // 3. Shimmer sweep
  $shimmer.classList.remove('sweep');
  void $shimmer.offsetWidth;          // reflow to restart animation
  $shimmer.classList.add('sweep');

  // 4. Pulse the whole stage
  $stage.classList.remove('pulse-play');
  void $stage.offsetWidth;
  $stage.classList.add('pulse-play');

  // 5. Start Ken Burns after shimmer finishes
  setTimeout(()=>{
    $stage.classList.add('kenburns');
  }, 1000);
}

function stopPlayback(){
  slitEls.forEach(el=>el.classList.remove('playing'));
  $stage.classList.remove('playing','pulse-play','kenburns');
  $shimmer.classList.remove('sweep');
}

/* =================================================================
   SORT DRIVER
   ================================================================= */
async function runSort(){
  if(isSorting)return;
  isSorting=true;abortFlag=false;comparisons=0;swaps=0;updateCounters();
  clearHL();$stage.classList.remove('complete');setDot('sorting');
  const key=$sel.value;updateAlgoInfo();
  setCodeLine(-1);setFlowStep('start');
  setState(`Starting ${ALGO_META[key].name}…`);
  try{
    switch(key){
      case'bubble':await bubbleSort();break;case'selection':await selectionSort();break;
      case'insertion':await insertionSort();break;case'merge':await mergeSortDrv();break;
      case'quick':await quickSortDrv();break;
    }
    clearHL();slitEls.forEach(el=>el.classList.add('done'));
    $stage.classList.add('complete');setDot('done');setCodeLine(-1);setFlowStep('done');
    setState(`✅ ${ALGO_META[key].name} complete — ${comparisons} comparisons, ${swaps} swaps.`);
    setPlayMode(false);setBtns(false);
    await sleep(400);playMeme();await sleep(600);showCelebration();
  }catch(e){
    if(e.name==='AbortError'){clearHL();setPlayMode(false);setCodeLine(-1);setFlowStep('start');return;}throw e;
  }finally{isSorting=false;}
}

/* =================================================================
   SORTING ALGORITHMS
   ================================================================= */
async function bubbleSort(){
  const n=arr.length;
  for(let i=0;i<n-1;i++){
    setCodeLine(1);setFlowStep('outer');let sw=false;
    for(let j=0;j<n-i-1;j++){
      setCodeLine(2);setFlowStep('inner');
      const a=slitEls[arr[j]],b=slitEls[arr[j+1]];
      a.classList.add('comparing');b.classList.add('comparing');
      comparisons++;updateCounters();setCodeLine(3);setFlowStep('compare');
      setState(`Comparing positions ${j} and ${j+1}`);await waitForStep();
      if(arr[j]>arr[j+1]){
        a.classList.remove('comparing');b.classList.remove('comparing');
        a.classList.add('swapping');b.classList.add('swapping');
        swaps++;updateCounters();setCodeLine(4);setFlowStep('swap');
        setState(`Swapping positions ${j} and ${j+1}`);
        sndSwap(j);swapPos(j,j+1);await waitForStep();
        a.classList.remove('swapping');b.classList.remove('swapping');sw=true;
      }else{a.classList.remove('comparing');b.classList.remove('comparing');}
    }
    slitEls[arr[n-1-i]].classList.add('sorted');
    setCodeLine(5);setFlowStep('next');if(!sw)break;
  }
  slitEls[arr[0]].classList.add('sorted');
}

async function selectionSort(){
  const n=arr.length;
  for(let i=0;i<n-1;i++){
    let mi=i;setCodeLine(1);setFlowStep('outer');setCodeLine(2);setFlowStep('setmin');
    slitEls[arr[mi]].classList.add('pivot');setState(`Finding min from ${i}`);
    for(let j=i+1;j<n;j++){
      setCodeLine(3);setFlowStep('scan');
      const ej=slitEls[arr[j]];ej.classList.add('comparing');
      comparisons++;updateCounters();setCodeLine(4);setFlowStep('compare');
      setState(`Comparing pos ${j} with min at ${mi}`);await waitForStep();
      if(arr[j]<arr[mi]){slitEls[arr[mi]].classList.remove('pivot');mi=j;setCodeLine(5);setFlowStep('update');slitEls[arr[mi]].classList.add('pivot');}
      ej.classList.remove('comparing');
    }
    if(mi!==i){
      const eI=slitEls[arr[i]],eM=slitEls[arr[mi]];
      eI.classList.add('swapping');eM.classList.remove('pivot');eM.classList.add('swapping');
      swaps++;updateCounters();setCodeLine(6);setFlowStep('swap');
      setState(`Swapping pos ${i} and ${mi}`);
      sndSwap(i);swapPos(i,mi);await waitForStep();
      eI.classList.remove('swapping');eM.classList.remove('swapping');
    }else{slitEls[arr[mi]].classList.remove('pivot');}
    slitEls[arr[i]].classList.add('sorted');
  }
  slitEls[arr[arr.length-1]].classList.add('sorted');
}

async function insertionSort(){
  const n=arr.length;slitEls[arr[0]].classList.add('sorted');
  for(let i=1;i<n;i++){
    setCodeLine(1);setFlowStep('pick');
    slitEls[arr[i]].classList.add('comparing');setState(`Inserting pos ${i}`);
    let j=i-1;
    while(j>=0){
      const ej=slitEls[arr[j]];ej.classList.add('comparing');
      comparisons++;updateCounters();setCodeLine(3);setFlowStep('compare');
      setState(`Comparing pos ${j} and ${j+1}`);await waitForStep();
      if(arr[j]>arr[j+1]){
        ej.classList.remove('comparing');slitEls[arr[j+1]].classList.remove('comparing');
        const eA=slitEls[arr[j]],eB=slitEls[arr[j+1]];
        eA.classList.add('swapping');eB.classList.add('swapping');
        swaps++;updateCounters();setCodeLine(4);setFlowStep('shift');
        setState(`Shifting pos ${j} → ${j+1}`);
        sndSwap(j);swapPos(j,j+1);await waitForStep();
        eA.classList.remove('swapping');eB.classList.remove('swapping');j--;
      }else{ej.classList.remove('comparing');slitEls[arr[j+1]].classList.remove('comparing');break;}
    }
    setCodeLine(5);setFlowStep('insert');
    for(let k=0;k<=i;k++) slitEls[arr[k]].classList.add('sorted');
  }
}

async function mergeSortDrv(){await mergeSort(0,arr.length-1);}
async function mergeSort(l,r){
  if(l>=r)return;setCodeLine(1);setFlowStep('check');
  const mid=Math.floor((l+r)/2);setCodeLine(2);setFlowStep('split');
  setCodeLine(3);setFlowStep('left');await mergeSort(l,mid);
  setCodeLine(4);setFlowStep('right');await mergeSort(mid+1,r);
  await mergeOp(l,mid,r);
}
async function mergeOp(l,mid,r){
  let s2=mid+1;comparisons++;updateCounters();
  if(arr[mid]<=arr[s2]){setCodeLine(7);setFlowStep('merge');setState(`Merge [${l}..${mid}] & [${s2}..${r}] — ok`);await waitForStep();return;}
  while(l<=mid&&s2<=r){
    const eL=slitEls[arr[l]],eR=slitEls[arr[s2]];
    eL.classList.add('comparing');eR.classList.add('comparing');
    comparisons++;updateCounters();setCodeLine(7);setFlowStep('merge');
    setState(`Merge: pos ${l} vs ${s2}`);await waitForStep();
    if(arr[l]<=arr[s2]){eL.classList.remove('comparing');eR.classList.remove('comparing');slitEls[arr[l]].classList.add('sorted');l++;}
    else{
      eL.classList.remove('comparing');eR.classList.remove('comparing');
      let idx=s2;
      while(idx!==l){
        const a=slitEls[arr[idx-1]],b=slitEls[arr[idx]];
        a.classList.add('swapping');b.classList.add('swapping');
        swaps++;updateCounters();setCodeLine(9);setFlowStep('merge');
        setState(`Shifting pos ${idx-1} → ${idx}`);
        sndSwap(idx);swapPos(idx-1,idx);await waitForStep();
        a.classList.remove('swapping');b.classList.remove('swapping');idx--;
      }
      slitEls[arr[l]].classList.add('sorted');l++;mid++;s2++;
    }
  }
  for(let k=l;k<=r;k++) slitEls[arr[k]].classList.add('sorted');
}

async function quickSortDrv(){await quickSort(0,arr.length-1);}
async function quickSort(lo,hi){
  if(lo<hi){
    setCodeLine(1);setFlowStep('check');
    const pi=await partition(lo,hi);slitEls[arr[pi]].classList.add('sorted');
    setCodeLine(3);setFlowStep('recurse');await quickSort(lo,pi-1);
    setCodeLine(4);setFlowStep('recurse');await quickSort(pi+1,hi);
  }else if(lo>=0&&lo<arr.length&&lo===hi){slitEls[arr[lo]].classList.add('sorted');}
}
async function partition(lo,hi){
  const pv=arr[hi];const eP=slitEls[pv];eP.classList.add('pivot');
  setCodeLine(6);setFlowStep('pivot');setState(`Pivot at pos ${hi}`);
  let i=lo-1;
  for(let j=lo;j<hi;j++){
    const ej=slitEls[arr[j]];ej.classList.add('comparing');
    comparisons++;updateCounters();setCodeLine(8);setFlowStep('compare');
    setState(`Comparing pos ${j} with pivot at ${hi}`);await waitForStep();
    if(arr[j]<pv){
      i++;
      if(i!==j){
        ej.classList.remove('comparing');
        const eI=slitEls[arr[i]];eI.classList.add('swapping');slitEls[arr[j]].classList.add('swapping');
        swaps++;updateCounters();setCodeLine(9);setFlowStep('partswap');
        setState(`Swapping pos ${i} and ${j}`);
        sndSwap(i);swapPos(i,j);await waitForStep();
        eI.classList.remove('swapping');slitEls[arr[j]].classList.remove('swapping');
      }else{ej.classList.remove('comparing');}
    }else{ej.classList.remove('comparing');}
  }
  eP.classList.remove('pivot');
  if(i+1!==hi){
    const eA=slitEls[arr[i+1]],eB=slitEls[arr[hi]];
    eA.classList.add('swapping');eB.classList.add('swapping');
    swaps++;updateCounters();setCodeLine(10);setFlowStep('place');
    setState(`Placing pivot at pos ${i+1}`);
    sndSwap(i+1);swapPos(i+1,hi);await waitForStep();
    eA.classList.remove('swapping');eB.classList.remove('swapping');
  }
  return i+1;
}

/* =================================================================
   EVENTS
   ================================================================= */
$tabCode.addEventListener('click',()=>{$tabCode.classList.add('active');$tabFlow.classList.remove('active');$codePanel.style.display='';$flowPanel.style.display='none';});
$tabFlow.addEventListener('click',()=>{$tabFlow.classList.add('active');$tabCode.classList.remove('active');$flowPanel.style.display='';$codePanel.style.display='none';});
$sel.addEventListener('change',()=>{updateAlgoInfo();renderCode($sel.value);renderFlowchart($sel.value);});
$scramble.addEventListener('click',scramble);
$step.addEventListener('click',()=>{if(!isSorting)runSort();else if(stepRes){const r=stepRes;stepRes=null;r();}});
$play.addEventListener('click',()=>{
  if(isPlaying){setPlayMode(false);return;}
  setPlayMode(true);
  if(!isSorting)runSort();else if(stepRes){const r=stepRes;stepRes=null;r();}
});
$slider.addEventListener('input',()=>{speed=+$slider.value;$speedVal.textContent=speed+' ms';});
$dismiss.addEventListener('click',hideCelebration);
$mute.addEventListener('click',()=>{
  isMuted=!isMuted;
  $mute.textContent=isMuted?'🔇':'🔊';
  $mute.classList.toggle('muted',isMuted);
  if($celebVid) $celebVid.muted=isMuted;
});
document.addEventListener('click',()=>ensureAudio(),{once:true});
$btnGo.addEventListener('click', enterApp);

let rT;window.addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(()=>{
  dims();slitEls.forEach((el,i)=>{el.style.width=slitW+'px';el.style.backgroundSize=`${stageW}px ${stageH}px`;el.style.backgroundPosition=`-${i*slitW}px 0`;});updatePositions();},200);});

init();
})();
