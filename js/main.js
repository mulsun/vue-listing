Vue.component('cities', {

 name: 'cities',
 props: ['city','tour'],
 
 template: `
 <div class='container'>
 <div class='city-list box columns'>
 <city class='column' v-for='city in cities' :id='city.id' :key='city.id' :city='city' :tour='tour' @click.native='select(city)'></city>
 </div>
 <div class='tour-list box columns'>
 <tour v-for='tour in selectedTours' :id='tour.id' :city="selectedCity" :key='tour.id' :tour='tour'></tour>
 </div>
 </div>
 `,

 data() {
  return {
   selectedCity: '',
   cities: [
   {id:1, name: 'istanbul'},
   {id:2, name: 'paris'},
   {id:3, name: 'barca'},
   {id:4, name: 'rome'},
   {id:5, name: 'mars'}
   ],

   tours: [
   {id:1, cid: 1, name: 'Istanbul Tour 1', text: 'Tour'},
   {id:2, cid: 2, name: 'Paris Tour 1', text: 'Tour'},
   {id:3, cid: 3, name: 'Barça Tour 1', text: 'Tour'},
   {id:4, cid: 4, name: 'Rome Tour 1', text: 'Tour'},
   {id:5, cid: 5, name: 'Mars Tour 1', text: 'Tour'},
   {id:6, cid: 1, name: 'Istanbul Tour 2', text: 'Tour'},
   {id:7, cid: 2, name: 'Paris Tour 2', text: 'Tour'},
   {id:8, cid: 3, name: 'Barça Tour 2', text: 'Tour'},
   {id:9, cid: 4, name: 'Rome Tour 2', text: 'Tour'},
   {id:10, cid: 5, name: 'Mars Tour 2', text: 'Tour'}
   ]
  }
 },

 computed:{
  selectedTours(){
   return this.tours.filter(tour=>tour.cid == this.selectedCity.id)
  }
 },

mounted: function () {
     console.log(this.$route.path)
     console.log(this.$route.name)
     console.log(this.$route.params)
     this.selectedCity = { id: this.$route.params.cityID }
     console.log('selected city:'+this.selectedCity)
},
  
  watch: {
    // '$route': 'fetchData',
    '$route' (to, from) {
     console.log(this.$route.path)
     console.log(this.$route.name)
     console.log(this.$route.params)
    }
  },

 methods: {
  select(city) {
   this.selectedCity = city
   // this.fetchData()
  },

  fetchData() {
  fetch('https://jsonplaceholder.typicode.com/posts?userID='+ this.selectedCity.id)
  .then((response) => {
   if(response.ok) {
    return response.json()
   }
   throw new Error('Network response was not ok')
  })
  .then((json) => {
   this.tours.push({
    id: json.id,
    cid: json.userId,
    name: json.title,
    text: json.body
   })
  })
  .catch((error) => {
   console.log(error)
  })
 },
 },

 components: {

  'city': {
   name: 'City',
   props: ['city'],
   template: `
   <div :id="[city.name]" :class="[city.name]">
   <router-link :to="{name: 'toTour', params: {cityID: city.id, slug: city.name}}">{{ city.name | capitalize }}</router-link>
   </div>`
  },

  'tour': {
   name: 'Tour',
   props: ['city', 'tour'],
   template: `
   <transition name='slide-fade'>
   <div :key='tour.id' :class="['column tour-' + tour.id]" :id="[city.name + '-tours']" :refs="city.id" :data-id="city.id">
   <h2>{{ tour.name }}</h2>
   <p>{{ tour.text }}</p>
   </div>
   </transition>
   `,
  },
 },

})

const Tour = {
  component: Vue.component('tour')
}

const Cities = {
  component: Vue.component('cities')
}


const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
     path: ':cityID', 
     component: Cities, 
     params: true,
     name: 'toTour',
     /*
     children: [
        { 
         path: './:cityID',
         component: Tour,
         name: 'toTour',
         params: true,
        },
      ]
      */
    }
  ]
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


new Vue({
  el: '#app',
  router,
})
