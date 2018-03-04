const Tour = {
 name: 'Tour',
 props: ['city', 'tour'],
 template: `
 <transition name='slide-fade'>
 <div :class="['column tour-' + tour.id]">
 <h2 class="title is-4">{{ tour.name }}</h2>
 <img :src="['http://loremflickr.com/g/620/240/' + city.name]">
 <p>{{ tour.text }}</p>
 </div>
 </transition>
 `,
}

// Navigation
const City = {
 name: 'City',
 props: ['city'],
 template: `
 <div class="navbar-start">
 <router-link 
 :to="{name: 'toTour', params: {cityID: city.id, slug: city.name}}" 
 v-for='city in cityList' 
 :city='city' 
 :key='city.id' 
 @click.native='select(city)' 
 :class="'navbar-item '+[city.name]">
 {{ city.name | capitalize }}
 </router-link>
 </div>`,
 data() {
  return {
   selectedCity: '',
   cityList: [
   {id:1, name: 'istanbul'},
   {id:2, name: 'paris'},
   {id:3, name: 'barca'},
   {id:4, name: 'rome'},
   {id:5, name: 'mars'}
   ],
  }
 },
 methods: {
  select(city) {this.selectedCity = city},
 }
}

const Cities = {
 name: 'cities',
 components: {'tour': Tour, 'city': City},
 template: `
 <div class='container'>
 <div class='tour-list box columns'>
 <tour v-for='tour in selectedTours' :city="selectedCity" :tour='tour' :key='tour.id'></tour>
 </div>
 </div>
 `,
 data() {
  return {
   selectedCity: '',

   tourList: [
   {id:1, cid: 1, name: 'Istanbul Tour 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:2, cid: 2, name: 'Paris Tour 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:3, cid: 3, name: 'Barça Tour 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:4, cid: 4, name: 'Rome Tour 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:5, cid: 5, name: 'Mars Tour 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:6, cid: 1, name: 'Istanbul Tour 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:7, cid: 2, name: 'Paris Tour 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:8, cid: 3, name: 'Barça Tour 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:9, cid: 4, name: 'Rome Tour 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
   {id:10, cid: 5, name: 'Mars Tour 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
   ],
  }
 },

 computed:{
  selectedTours(){
   return this.tourList.filter(tour=>tour.cid == this.$route.params.cityID)
   // return this.tourList.filter(tour=>tour.cid == this.selectedCity.id)
  }
 },

 methods: {
  select(city) {this.selectedCity = city},

  fetchData() {
   fetch('https://jsonplaceholder.typicode.com/posts?userID='+ this.$route.params.cityID)
   .then((response) => {
    if(response.ok) {
     return response.json()
    }
    throw new Error('Network response was not ok')
   })
   .then((json) => {
    this.tourList.push({
     cid: json.id,
     id: json.userId,
     name: json.title,
     text: json.body
    })
   })
   .catch((error) => {
    console.log(error)
   })
  },
 },

 created() {
  // this.fetchData()
 },

 beforeUpdate() {
  //var result  = this.cityList.filter(o=> o.id == this.$route.params.cityID)
  // console.log(result[0])
  // this.$set(this.selectedCity, 'name', result[0])

  //var rid = this.$route.params.cityID
  //this.selectedCity = this.cityList.filter(function (o) {
  //return o.id.match(rid)
  // })

 },

 mounted () {
  this.selectedCity = { id: this.$route.params.cityID }
  console.log('selected city:'+this.selectedCity.id)
 },

 watch: {
  '$route' (to, from) {
   // this.fetchData()
  }
 },
}

Vue.component('cities', Cities)
Vue.component('city', City)

Vue.filter('capitalize', function (value) {
 if (!value) return ''
  value = value.toString()
 return value.charAt(0).toUpperCase() + value.slice(1)
})

const router = new VueRouter({
 mode: 'history',
 routes: [
 { 
  path: '/:cityID', 
  component: Tour, 
  name: 'toTour',
 }
 ]
})

new Vue({
 el: '#app',
 router,
})

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});