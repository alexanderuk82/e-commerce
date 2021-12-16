// 'use strict';

// ==============================//
//  ***  slider Swiper  ***
// ============================ //

const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 30,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// ==============================//
//  ***  CountDown  ***
// ============================ //
//

const hours = document.querySelector('hour');
const minutes = document.querySelector('min');
const seconds = document.querySelector('sec');

const countDown = () => {
  // Defined Star date and Final date

  const dateEnd = new Date('Jan 01, 2022 00:00:00').getTime();
  const nowDate = new Date().getTime();
  const gapDate = dateEnd - nowDate;

  // Define the value od each date and hours

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // We get the results

  const textDay = Math.floor(gapDate / day);
  const textHours = Math.floor((gapDate % day) / hour);
  const textMinute = Math.floor((gapDate % hour) / minute);
  const textSecond = Math.floor((gapDate % minute) / second);

  // Insert the value DOM elements

  document.querySelectorAll('day').innerText = textDay;
  // hours.innerHTML = textHours;
};

setInterval(countDown, 1000);

// ==============================//
//  ***  Read products from Etsy API ***
// ============================ //

const featuredTitle = document.querySelector('.featured-product');

const grid = document.querySelector('.featured__container__grid');

// ===========================================//
//  ***  Consuming Featured Active products***
// ========================================= //

const getProducts = async function () {
  const resp = await fetch(
    'https://community-etsy.p.rapidapi.com/listings/interesting?api_key=wt7x9o3e5nphr506evd80l9e',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-etsy.p.rapidapi.com',
        'x-rapidapi-key': 'fa8acf2c65mshb42938ea644383bp1216f8jsn5311ae779480',
      },
    }
  );
  const data = await resp.json();
  const listings = data.results;
  showProduct(listings);
};

function showProduct(items) {
  let i = 0;
  items.forEach(product => {
    const { title, price, url } = product;
    const container = document.createElement('figure');
    container.classList.add('featured__container__grid__item');
    if (product.state === 'active' && i <= 7) {
      i++;
      container.innerHTML = `
      
      <a href="${url}" class="featured__conatiner__grid__link">
      <img
      src="https://picsum.photos/200/300.jpg"
      alt="product items"
      />
      </a>
      <span class="discount"> -20% </span>
      
      <div class="countdown">
      <div class="time">
      <h5 class="h5 day">00</h5>
    <small class="title">Days</small>
    </div>
    <div class="time">
    <h5 class="h5 hour">00</h5>
    <small class="title">Hours</small>
    </div>
    <div class="time">
    <h5 class="h5 min">00</h5>
    <small class="title">Mins</small>
    </div>
    <div class="time">
    <h5 class="h5 sec">00</h5>
    <small class="title">Secs</small>
    </div>
    </div>
                  <figcaption>
                  <h5 class="h5 featured-product">${title}</h5>
                  <small>
                  <span class="lowPrice">£${price}</span>
                  <span class="offerPrice">£${Math.floor(
                    price - 100 / 20
                  )}</span>
                    </small>
                    </figcaption>
                    
                    `;
    } else {
      container.style.display = 'none';
    }
    grid.appendChild(container);
  });
}

getProducts();
// ===========================================//
//  ***  Consuming Top rated Active products***
// ========================================= //
const main = document.querySelector('.main__container__top-rated');
const topRated = async function () {
  const res = await fetch(
    'https://community-etsy.p.rapidapi.com/listings/trending?api_key=wt7x9o3e5nphr506evd80l9e',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-etsy.p.rapidapi.com',
        'x-rapidapi-key': 'fa8acf2c65mshb42938ea644383bp1216f8jsn5311ae779480',
      },
    }
  );

  const data = await res.json();
  const result = data.results;
  showProductTop(result);
};

function showProductTop(item) {
  let i = 0;
  item.forEach(items => {
    const { title, price, url } = items;
    const containTop = document.createElement('figure');
    containTop.classList.add('main__container__item');

    if (items.state === 'active' && i <= 3) {
      i++;
      containTop.innerHTML = `
                      <a class="main__container__item--link" href="${url}">
                      <img
                      src="https://source.unsplash.com/random/800x800/"
                      alt="Top rated"
                      />
                      </a>
                      <figcaption
                      class="main__container__item main__container__item__details"
                      >
                      <a class="main__container__item__details--link" href="${url}" target="_blank">
                      <h5 class="main__container__item__details--title">
                      ${title}
                      </h5>
                </a>
                <p class="main__container__item__details--price">£${price}</p>
                <div class="main__container__item__details--icons">
                <div class="main__container__item__details--icon">
                <img src="images/seacr-icon.svg" alt="search btn" />
                </div>
                <div class="main__container__item__details--icon">
                <img src="images/cart.svg" alt="search btn" />
                </div>
                </div>
                </figcaption>
                
                `;
    } else {
      containTop.style.display = 'none';
    }
    main.appendChild(containTop);
  });
}

topRated();

// ===========================================//
//  ***  Consuming Best selling Active products***
// ========================================= //
const mainSell = document.querySelector('.main__container__best-selling');
const bestSelling = async function () {
  const res = await fetch(
    'https://community-etsy.p.rapidapi.com/featured_treasuries/listings/homepage_current?api_key=wt7x9o3e5nphr506evd80l9e',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-etsy.p.rapidapi.com',
        'x-rapidapi-key': 'fa8acf2c65mshb42938ea644383bp1216f8jsn5311ae779480',
      },
    }
  );

  const data = await res.json();
  const result = data.results;
  showProductBest(result);
};

function showProductBest(item) {
  let i = 1;
  item.forEach(items => {
    const { title, price, url } = items;
    const containBest = document.createElement('figure');
    containBest.classList.add('main__container__item');
    if (items.state === 'active' && i <= 4) {
      i++;

      containBest.innerHTML = `
        <a class="main__container__item--link" href="${url}">
        <img
        src="https://source.unsplash.com/random/780x400"
        alt="Top rated"
        />
        </a>
        <figcaption
        class="main__container__item main__container__item__details"
        >
        <a class="main__container__item__details--link" href="${url}" target="_blank">
        <h5 class="main__container__item__details--title">
        ${title}
        </h5>
        </a>
        <p class="main__container__item__details--price">£${price}</p>
        <div class="main__container__item__details--icons">
        <div class="main__container__item__details--icon">
        <img src="images/seacr-icon.svg" alt="search btn" />
        </div>
        <div class="main__container__item__details--icon">
        <img src="images/cart.svg" alt="search btn" />
        </div>
        </div>
        </figcaption>
        
        `;
    } else {
      containBest.style.display = 'none';
      return;
    }
    mainSell.appendChild(containBest);
  });
}

bestSelling();

// ===========================================//
//  ***  Consuming Best selling Active products***
// ========================================= //

const onSales = document.querySelector('.main__container__on-sale');

const onSale = async function () {
  const res = await fetch(
    'https://community-etsy.p.rapidapi.com/listings/active?api_key=wt7x9o3e5nphr506evd80l9e',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-etsy.p.rapidapi.com',
        'x-rapidapi-key': 'fa8acf2c65mshb42938ea644383bp1216f8jsn5311ae779480',
      },
    }
  );

  const data = await res.json();
  const result = data.results;
  showProductOnSale(result);
};

function showProductOnSale(item) {
  let i = 1;
  item.forEach(items => {
    const { title, price, url } = items;
    const containOnSale = document.createElement('figure');
    containOnSale.classList.add('main__container__item');
    if (items.state === 'active' && i <= 4) {
      i++;

      containOnSale.innerHTML = `
        <a class="main__container__item--link" href="${url}">
        <img
        src="https://source.unsplash.com/random/900x400"
        alt="Top rated"
        />
        </a>
        <figcaption
        class="main__container__item main__container__item__details"
        >
        <a class="main__container__item__details--link" href="${url}" target="_blank">
        <h5 class="main__container__item__details--title">
        ${title}
        </h5>
        </a>
        <p class="main__container__item__details--price">£${price}</p>
        <div class="main__container__item__details--icons">
        <div class="main__container__item__details--icon">
        <img src="images/seacr-icon.svg" alt="search btn" />
        </div>
        <div class="main__container__item__details--icon">
        <img src="images/cart.svg" alt="search btn" />
        </div>
        </div>
        </figcaption>
        
        `;
    } else {
      containBest.style.display = 'none';
      return;
    }
    onSales.appendChild(containOnSale);
  });
}

onSale();
