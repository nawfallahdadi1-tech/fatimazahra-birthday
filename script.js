document.body.classList.add("locked");

const intro = document.getElementById("intro");
document.getElementById("beginBtn").addEventListener("click", () => {
  intro.classList.add("hide");
  document.body.classList.remove("locked");
  setTimeout(() => intro.remove(), 1200);
});

const target = new Date("2026-07-21T00:00:00").getTime();
function updateCountdown(){
  const now = Date.now();
  const d = Math.max(0, target-now);
  const vals = {
    days: Math.floor(d/86400000),
    hours: Math.floor((d/3600000)%24),
    minutes: Math.floor((d/60000)%60),
    seconds: Math.floor((d/1000)%60)
  };
  Object.entries(vals).forEach(([k,v])=>{
    const el=document.getElementById(k);
    if(el) el.textContent=String(v).padStart(2,"0");
  });
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("visible");
  });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const finale=document.getElementById("finale");
document.getElementById("finalBtn").addEventListener("click",()=>{
  finale.classList.add("show");
  burst();
});
document.getElementById("closeFinal").addEventListener("click",()=>finale.classList.remove("show"));

function heart(){
  const h=document.createElement("div");
  h.className="heart";
  h.textContent=Math.random()>.5?"❤️":"💗";
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(14+Math.random()*22)+"px";
  h.style.animationDuration=(4+Math.random()*4)+"s";
  document.getElementById("hearts").appendChild(h);
  setTimeout(()=>h.remove(),9000);
}
function burst(){for(let i=0;i<35;i++)setTimeout(heart,i*70);}

const music=document.getElementById("music");
const toggle=document.getElementById("musicToggle");
let playing=false;
toggle.addEventListener("click",async()=>{
  try{
    if(!playing){await music.play();toggle.textContent="❚❚";playing=true}
    else{music.pause();toggle.textContent="♫";playing=false}
  }catch(e){alert("Add your song to this folder and name it music.mp3");}
});
