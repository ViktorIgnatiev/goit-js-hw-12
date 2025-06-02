import{a as b,S as v,i as d}from"./assets/vendor-CrlV4O_2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const E="43966863-3e3d2a956fed7cb918868d7e8",w="https://pixabay.com/api/";async function f(e,s=1){const a=new URLSearchParams({key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s});return(await b.get(`${w}?${a}`)).data}let h;function c(){const e=document.querySelector(".gallery");if(!e){console.error("Gallery element not found");return}return h=new v(".gallery a",{captionsData:"alt",captionDelay:250}),{galleryEl:e,loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")}}function y(e){const{galleryEl:s}=c();if(!s)return;const a=e.map(({webformatURL:n,largeImageURL:t,tags:r,likes:i,views:o,comments:l,downloads:L})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${t}">
          <img class="gallery-image" src="${n}" alt="${r}" />
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <b>Likes</b>
            <span>${i}</span>
          </div>
          <div class="gallery-info-item">
            <b>Views</b>
            <span>${o}</span>
          </div>
          <div class="gallery-info-item">
            <b>Comments</b>
            <span>${l}</span>
          </div>
          <div class="gallery-info-item">
            <b>Downloads</b>
            <span>${L}</span>
          </div>
        </div>
      </li>
    `).join("");s.insertAdjacentHTML("beforeend",a),h.refresh()}function S(){const{galleryEl:e}=c();e&&(e.innerHTML="")}function m(){const{loaderEl:e}=c();e&&(e.style.display="block")}function g(){const{loaderEl:e}=c();e&&(e.style.display="none")}function p(){const{loadMoreBtn:e}=c();e&&e.classList.remove("hidden")}function u(){const{loadMoreBtn:e}=c();e&&e.classList.add("hidden")}document.addEventListener("DOMContentLoaded",()=>{c(),M()});function M(){const e=document.getElementById("search-form"),s=document.querySelector(".load-more");if(!e||!s){console.error("Required elements not found");return}let a="",n=1,t=0;e.addEventListener("submit",async o=>{if(o.preventDefault(),a=o.target.searchQuery.value.trim(),n=1,!a){d.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}try{m(),u(),S();const l=await f(a,n);if(t=l.totalHits,l.hits.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(l.hits),n*15<t?p():i(),d.success({title:"Success",message:`Hooray! We found ${t} images.`,position:"topRight"})}catch{d.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{g()}}),s.addEventListener("click",async()=>{n+=1;try{m(),u();const o=await f(a,n);y(o.hits),r(),n*15>=t?i():p()}catch{d.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{g()}});function r(){const o=document.querySelector(".gallery-item");if(!o)return;const{height:l}=o.getBoundingClientRect();window.scrollBy({top:l*2,behavior:"smooth"})}function i(){u();const o=document.createElement("p");o.classList.add("end-message"),o.textContent="We're sorry, but you've reached the end of search results.",document.querySelector(".gallery-container").appendChild(o)}}
//# sourceMappingURL=index.js.map
