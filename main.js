Vue.component('cities', {

	name: 'Listings',
	props: ['city','tour'],
	
	template: `
	<div>
	<div class='city-list box'>
	<city v-for='city in cities' :id='city.id' :key='city.id' :city='city' :tour='tour' @click.native='select(city)'></city>
	</div>
	<div class='tour-list box'>
	<tour v-for='tour in selectedTours' :id='tour.id' :city="selectedCity" :key='tour.id' :tour='tour'></tour>
	</div>
	</div>
	`,

	data() {
		return {
			selectedCity: '',
			cities: [
			{id:1, name: 'Istanbul'},
			{id:2, name: 'Paris'},
			{id:3, name: 'Barça'},
			{id:4, name: 'Rome'},
			{id:5, name: 'Mars'}
			],

			tours: [
   {id:1, cid: 1, name: 'Istanbul', text: 'Tour'},
   {id:2, cid: 2, name: 'Paris', text: 'Tour'},
   {id:3, cid: 3, name: 'Barça', text: 'Tour'},
   {id:4, cid: 4, name: 'Rome', text: 'Tour'},
   {id:5, cid: 5, name: 'Mars', text: 'Tour'}]
		}
	},

 computed:{
  selectedTours(){
   return this.tours.filter(tour=>tour.cid == this.selectedCity.id)
  }
 },

 methods: {
  select(city) {
   this.selectedCity = city
   this.fetchData()
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
   <div :id="[city.name.toLowerCase()]" :class="[city.name.toLowerCase()]">
   <h1>
   <router-link :to="city.name.toLowerCase()">
   {{ city.name }}
   </router-link>
   </h1>
   </div>`
  },

  'tour': {
   name: 'Tour',
   props: ['city', 'tour'],
   template: `
   <transition name='slide-fade'>
   <div :key='tour.id' :class="['tour-' + tour.id]" :id="[city.name + '-tours']" :refs="city.id" :data-id="city.id">
   <h2>{{ tour.name }}</h2>
   <p>{{ tour.text }}</p>
   </div>
   </transition>
   `,
  },
 },

})

const City = {
  component: tour
}

const router = new VueRouter({
  routes: [
    { 
    path: '/city/:city.name',
    component: root,
    mode: 'history' }
  ]
})

const app = new Vue({
 router 
}).$mount('#root')
