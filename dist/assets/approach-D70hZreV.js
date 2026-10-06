import{r as e,t}from"./hub-BKlWcQ0C.js";var n=[{label:`WHO ARE WE?`,short:`WHO`,copy:`HOUSE OF BLACK SHEEP IS AN INDEPENDENT CREATIVE TERRITORY WHERE ORIGINAL THINKERS FIND ONE ANOTHER, COMBINE THEIR STRENGTHS AND BUILD WORK WITH THE POWER TO MATTER.`},{label:`WHY DO WE EXIST?`,short:`WHY`,copy:`WE BELIEVE THE WORLD IS NOT SHORT OF CREATORS. IT IS SHORT OF PLATFORMS THAT RECOGNISE THEM AND OPPORTUNITIES THAT ALLOW THEIR STRONGEST IDEAS TO BECOME REAL.`},{label:`WHAT ARE WE BUILDING?`,short:`WHAT`,copy:`WE UNITE INDEPENDENT CREATORS INTO A POWERFUL GLOBAL COMMUNITY, TURNING INDIVIDUAL TALENT INTO SHARED MOMENTUM, MEANINGFUL OPPORTUNITIES AND WORK THAT CAN REVOLUTIONISE THE WORLD.`},{label:`HOW DO WE MAKE IT REAL?`,short:`HOW`,copy:`WE BRING INNOVATIVE IDEAS TO LIFE THROUGH PROJECTS IN BRANDING, MARKETING AND TECHNOLOGY, USING CREATIVITY TO IMPROVE CULTURE, BUSINESS AND EVERYDAY LIFE.`}],r=Array.from({length:8},(e,t)=>`<rect x="44" y="4" width="12" height="25" rx="2" transform="rotate(${t*45} 50 50)"/>`).join(``);e({current:`approach/`,content:`<section class="hobs-stage hobs-stage--profile">
    <div class="hobs-copy">
      <h1 class="hobs-title">INDEPENDENT<br>MINDS.<br><em>ONE TERRITORY.</em></h1>
      <p class="hobs-lede profile-intro">WE BRING CREATIVE MINDS AND TECHNOLOGY TOGETHER TO TURN NOISY IDEAS INTO MEANINGFUL EXPERIENCES, MAKING THE WORLD MORE EVOLVED, MORE IMAGINATIVE AND MORE BEAUTIFUL.</p>
    </div>
    <div class="profile-stack">
      <div class="profile-machine" data-profile role="group" aria-label="Interactive profile drop machine">
        <div class="profile-machine__sheep" data-sheep>${t({count:1})}</div>
        ${Array.from({length:5},(e,t)=>`<div class="profile-level" data-level="${t}" style="--level:${t}">
          <span class="profile-platform" aria-hidden="true"><i></i><i></i></span>
          ${t?`<strong>${n[t-1].short}<span class="profile-question-mark">?</span></strong>`:``}
        </div>`).join(``)}
        <div class="profile-gears" role="group" aria-label="Forward and reverse gear assembly">
          <button class="profile-gear profile-gear--forward" type="button" data-gear aria-label="Move the profile gear forward">
            <svg viewBox="0 0 100 100" aria-hidden="true">${r}<circle cx="50" cy="50" r="31"/><circle class="profile-gear__hole" cx="50" cy="50" r="13"/></svg>
          </button>
          <button class="profile-gear profile-gear--reverse" type="button" data-reverse-gear aria-label="Move the profile gear backward">
            <svg viewBox="0 0 100 100" aria-hidden="true">${r}<circle cx="50" cy="50" r="31"/><circle class="profile-gear__hole" cx="50" cy="50" r="13"/></svg>
          </button>
        </div>
      </div>
      <div class="approach-readout profile-readout" aria-live="polite">
        <div><h2 data-title>OPERATE THE GEARS</h2><p data-copy>TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.</p></div>
      </div>
    </div>
  </section>`});var i=document.querySelector(`[data-profile]`),a=i.querySelector(`[data-sheep]`),o=[...i.querySelectorAll(`[data-level]`)],s=document.querySelector(`[data-gear]`),c=document.querySelector(`[data-reverse-gear]`),l=document.querySelector(`[data-title]`),u=document.querySelector(`[data-copy]`),d=-1,f=!1,p=0,m=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,h=e=>m?0:e;function g(e){p+=e,s.style.setProperty(`--gear-turn`,p),c.style.setProperty(`--gear-turn`,p)}function _(){d=-1,a.style.setProperty(`--sheep-level`,0),o.forEach(e=>e.classList.remove(`is-split`,`is-active`)),l.textContent=`OPERATE THE GEARS`,u.textContent=`TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.`,i.classList.add(`is-resetting`),window.setTimeout(()=>i.classList.remove(`is-resetting`),h(520))}s.addEventListener(`click`,()=>{if(f)return;if(f=!0,g(1),d===n.length-1){window.setTimeout(_,h(300)),window.setTimeout(()=>{f=!1},h(850));return}let e=d+1,t=d+1;o[e].classList.add(`is-split`),window.setTimeout(()=>{d=t,a.style.setProperty(`--sheep-level`,d+1)},h(230)),window.setTimeout(()=>{o.forEach(e=>e.classList.remove(`is-active`)),o[d+1].classList.add(`is-active`),l.textContent=n[d].label,u.textContent=n[d].copy},h(690)),window.setTimeout(()=>{f=!1},h(900))}),c.addEventListener(`click`,()=>{if(f||d<0)return;g(-1),f=!0;let e=d,t=d-1;o.forEach(e=>e.classList.remove(`is-active`)),o[e].classList.remove(`is-split`),window.setTimeout(()=>{d=t,a.style.setProperty(`--sheep-level`,d+1)},h(230)),window.setTimeout(()=>{d<0?(l.textContent=`OPERATE THE GEARS`,u.textContent=`TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.`):(o[d+1].classList.add(`is-active`),l.textContent=n[d].label,u.textContent=n[d].copy)},h(690)),window.setTimeout(()=>{f=!1},h(900))});