class InfiniteScroll extends HTMLElement{constructor(){super(),this.addEventListener("click",this.onClickHandler.bind(this)),"infinite"==this.dataset.trigger&&new IntersectionObserver(this.handleIntersection.bind(this),{rootMargin:"0px 0px 200px 0px"}).observe(this)}onClickHandler(){if(this.classList.contains("loading")||this.classList.contains("disabled"))return;this.classList.add("loading"),this.classList.add("disabled");InfiniteScroll.getSections().forEach((()=>{const e=this.dataset.url;InfiniteScroll.renderSectionFromFetch(e)}))}handleIntersection(e,t){e[0].isIntersecting&&(t.unobserve(this),this.onClickHandler())}static getSections(){return[{section:document.getElementById("product-grid").dataset.id}]}static renderSectionFromFetch(e){fetch(e).then((e=>e.text())).then((e=>{const t=e;InfiniteScroll.renderPagination(t),InfiniteScroll.renderProductGridContainer(t)})).catch((e=>{console.error(e)}))}static renderPagination(e){const t=document.getElementById("ProductGridContainer").querySelector(".pagination-wrapper"),n=(new DOMParser).parseFromString(e,"text/html").getElementById("ProductGridContainer").querySelector(".pagination-wrapper");n?t.innerHTML=n.innerHTML:t.remove()}static renderProductGridContainer(e){const t=document.getElementById("product-grid"),n=(new DOMParser).parseFromString(e,"text/html").getElementById("product-grid");t.insertAdjacentHTML("beforeend",n.innerHTML)}}customElements.define("infinite-scroll",InfiniteScroll);