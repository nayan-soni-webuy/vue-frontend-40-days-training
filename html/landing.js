//jai hoo
const products_url = "https://dummyjson.com/products?limit=0"; //limit 0 for fetch all products
const warranty_img = "https://uk.static.webuy.com/images/category/uk_badge.png";
const blog_img = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlxFMWIG6OHWFWkIkIF5Zq3KB0rAa4NiWX8t3KxXItXTA3N8D7Z7CSk6SDbcHqu6-fOcl8taBU4a4ONL1O34EL2rkW_iWe0_PycQS2bsBVNyR1v1uCDWcIeBGkc37y-BVJ_9qiqt1PPAyUBjVqhtsgLakwMAE0KglA8CwBEnNdODgwCZbDL8pdBXbTwbES/s1920/UK%20CeX%20Extended%20Xmas%20Returns%20digital%20assets%20blog%20header%20OCT26%20GS-04.png";

// har section ke cards ka count aur har section ki categories
const sectionConfig = {
    recommended: { count: 10, categories: ['smartphones', 'laptops', 'tablets'] },
    hot: { count: 20, sortByRating: true },
    gaming: { count: 20, categories: ['sports-accessories', 'mobile-accessories'] },
    phones: { count: 20, categories: ['smartphones', 'tablets'] },
    computing: { count: 20, categories: ['laptops', 'tablets', 'mobile-accessories'] },
    electronics: { count: 20, categories: ['mobile-accessories', 'smartphones'] },
    film: { count: 20, categories: [] },
};


//   blog cards ka data 
const blogPosts = [
    {title: 'Extended Xmas returns promise 2026', date: 'Sunday, 1 Nov 2026'},
    {title: 'Top Cash Ready For Your PS5!', date: 'Monday, 12 Oct 2026'},
    {title: '5 Year Warranty at CeX!', date: 'Saturday, 10 Jan 2026'},
    {title: 'Spread the cost with Klarna pay later & pay in 3 at CeX.', date: 'Friday, 9 Jan 2026'},
    {title: 'Trade in your old tech today', date: 'Thursday, 8 Jan 2026'},
    {title: 'Why shop pre-owned?', date: 'Wednesday, 7 Jan 2026'},
];




// step (1) landing.html fetch kro aur <main> me dalo #####################
async function loadLandingPage() {
    const container = document.getElementById("landing-container");

    try {
        const response = await fetch("landing.html");
        container.innerHTML = await response.text();
        container.classList.add('landing');
    } catch(error) {
        console.log('landing.html load ni hua: ', error);
        return;
    }

    //html aane ke baad baki kam krna, warna elemens ni milenge
    document.querySelectorAll('.slider').forEach(setupSlider);
    await loadProducts(); 
    renderBlog();
    document.querySelectorAll('.product-section').forEach(setupScroller);
} 



//  step {2} banner slider arrows au r dots #################### 
function setupSlider(slider) {

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dots button');
    let current = 0;

    function show(index) {
        current = (index + slides.length) % slides.length; //last slide ke baad fir se first slide 
        slides.forEach(function(slide, n) {
            slide.hidden = n !== current;
        });
        dots.forEach(function(dot, n) {
            dot.classList.toggle('active', n === current);
        });
    }

    slider.querySelector('.slide-prev').addEventListener('click', function() {
        show(current - 1);
    });

    slider.querySelector('.slide-next').addEventListener('click', function() {
        show(current + 1);
    });
// -------------------------- debug...............................................
    dots.forEach(function(dot, n) {
        dot.addEventListener('click', function() {
            show(n);
        });
    });

    show(0);
    // --------------------------
}


//############################## setp (3) START #####################################3
//------------------ products fetch krke cards banana h-
async function loadProducts() {

    try {

        const response = await fetch(products_url);
        if(!response.ok) throw new Error('API error: ' + response.status);
        const data = await response.json();

        // her section ke lie products select kro aur cards banao 
        Object.keys(sectionConfig).forEach(function (name) {
            const products = pickProducts(data.products, sectionConfig[name]);
            // her section ko uske data-section se pechanenge
            const row = document.querySelector('[data-section="' + name + '"] .cards-row');
            row.innerHTML = products.map(makeCard).join('');
        });

    } catch(error) {
        console.log('Products load ni hua: ', error);
    }

}



// %%%%%%%%%%%%%% pahle matching categroy ke products show kro then kam pade to baki ke bhar do
function pickProducts(all, config) {
    
    let list = all.slice();

    if(config.sortByRating) {
        list.sort(function(a, b) {
            return b.rating - a.rating;
        });
    } else {
        const wanted = config.categories;
        const matching = all.filter(function (p) {
            return wanted.includes(p.category);
        });
        const others = all.filter(function(p) {
            return !wanted.includes(p.category);
        });
        list = matching.concat(others);
    }

    return list.slice(0, config.count); // 0 se config ke count jitne cards show honge

}


//  1 product ka card------------------
function makeCard(product) {
    return `
        <article class="card">

    <img src="${warranty_img}" class="badge" alt="5 year warranty">
    <button type="button" class="heart" aria-label="Add to favourites">&#9825;</button>

    <div class="card-img">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
    </div>

    <div class="card-body">
        <p class="rating"><span>&#9733;</span>${product.rating.toFixed(1)}</p>
        <p class="card-cat">${product.category}</p>
        <h3 class="card-name">${product.title}</h3>

        <div class="card-bottom">
            <span class="price">&pound;${product.price.toFixed(2)}</span>
            <button type="button" class="basket-btn" aria-label="Add ${product.title} to basket">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9h18l-2 10H5L3 9z M8 9l3-5 M16 9l-3-5" />
                </svg>
            </button>
        </div>
        
    </div>

</article>`;
}

//############################## setp (3) END #####################################3 


//  step {4}blog cards ####################
function renderBlog() {

    const row = document.querySelector('[data-section="blog"] .cards-row');

    row.innerHTML = blogPosts.map(function (post) {
        return `
<article class="blog-card">

    <img src="${blog_img}" alt="${post.title}" loading="lazy">
    <div>
        <p class="blog-label">Cex Blog</p>
        <h3>${post.title}</h3>
        <p class="blog-date">${post.date}</p>
    </div>

</article>`;
    }).join('');

} 


//  step {5} section ke prev next btns ####################
function setupScroller(section) {

    const row = section.querySelector('.cards-row');
    const prev = section.querySelector('.btn-prev');
    const next = section.querySelector('.btn-next');

    // ik click pe row ki 80% widht jitna scroll(smooth css se aa ra h)
    function step() {
        return row.clientWidth * 0.8;
    }

    // start/end pe btn grey krna h (disabled)
    function updateButtons() {
        prev.disabled = row.scrollLeft <= 0;
        next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1;
    }

    prev.addEventListener('click', function() { 
        row.scrollBy({ left: -step() });
    });
    next.addEventListener('click', function() {
        row.scrollBy({ left: step() });
    });
    row.addEventListener('scroll', updateButtons);

    updateButtons();

}


//index page load hote hi landing page load krna h
document.addEventListener('DOMContentLoaded', loadLandingPage);