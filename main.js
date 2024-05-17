const app = Vue.createApp({
    data() {
      return {
        searchText: '',

        buffets: [],
        buffet: {
            id: '',
            business_name: '',
            contact_phone: '',
            address: '',
            district: '',
            state: '',
            city: '',
            postal_code: '',
            description: '',
            payment_methods: '',
            visible: false
        },

        buffet_types: [],
        buffet_type: {
            id: '',
            name: '',
            description: '',
            max_capacity_people: '',
            min_capacity_people: '',
            duration: '',
            alcoholic_beverages: '',
            decoration: '',
            parking_valet: '',
            exclusive_address: '',
            visible: false
        },

        price: 0,
        buffet_type_available_date: '',
        buffet_type_available_number_of_guests: '',
        buffet_type_available: false,
        buffet_type_available_error: '',
      };
    },

    computed:{
        filtered_buffets(){
            if(this.searchText){
                this.closeBuffet();
                return this.buffets.filter(buffet => {
                    return buffet.business_name.toLowerCase().includes(this.searchText.toLowerCase());
                });
            }
            else{
                return this.buffets;
            }
        }
    },

    async mounted(){
        this.filtered_buffets =  await this.getBuffets();
    },

    methods:{
        async getBuffetTypeAvailable(){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${this.buffet.id}/buffet_types/${this.buffet_type.id}/available?date=${this.buffet_type_available_date}&number_of_guests=${this.buffet_type_available_number_of_guests}`);
            
            let data = await response.json();
            
            if (response.status == 412) {
                this.buffet_type_available = false 
                this.buffet_type_available_error = data.error;
            }
            else {
                this.buffet_type_available = true
                this.price = data.price;
            }
        },

        closeBuffet(){
            this.buffet.visible = false;
            this.closeBuffetTypes();
        },

        closeBuffetTypes(){
            this.buffet_types = [];
            this.closeBuffetType();
        },

        closeBuffetType(){
            this.buffet_type.visible = false;
            this.buffet_type_available = false;
            this.buffet_type_available_error = '';
        },

        async showBuffet(buffet_id){
            await this.getBuffet(buffet_id);
            this.buffet.visible = true;
        },

        async showBuffetType(buffet_type_id){
            await this.getBuffetType(buffet_type_id);
            this.buffet_type.visible = true;
        },

        async getBuffets(){
            let response = await fetch('http://localhost:3000/api/v1/buffets/');
            let data = await response.json();
            
            this.buffets = [];

            data.forEach(item => {
                var buffet = new Object();

                buffet.id = item.id;
                buffet.business_name = item.business_name;

                this.buffets.push(buffet);
            });
        },

        async getBuffetTypes(buffet_id){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffet_id}/buffet_types`);
            let data = await response.json();
            
            this.buffet_types = [];

            data.forEach(item => {
                var buffet_type = new Object();

                buffet_type.id = item.id;
                buffet_type.name = item.name;
                buffet_type.description = item.description;
                buffet_type.max_capacity_people = item.max_capacity_people;
                buffet_type.min_capacity_people = item.min_capacity_people;
                buffet_type.duration = item.duration;
                buffet_type.alcoholic_beverages = item.alcoholic_beverages;
                buffet_type.decoration = item.decoration;
                buffet_type.parking_valet = item.parking_valet;
                buffet_type.exclusive_address = item.exclusive_address;

                this.buffet_types.push(buffet_type);
            });
        },

        async getBuffet(buffet_id){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffet_id}`);
            let data = await response.json();
            
            this.buffet.id =  data.id;
            this.buffet.business_name =  data.business_name;
            this.buffet.contact_phone =  data.contact_phone;
            this.buffet.address =  data.address;
            this.buffet.district =  data.district;
            this.buffet.state =  data.state;
            this.buffet.city =  data.city;
            this.buffet.postal_code =  data.postal_code;
            this.buffet.description =  data.description;
            this.buffet.payment_methods =  data.payment_methods;
            this.buffet.visible = false;
            //await this.getBuffetTypes(this.buffet.id);
        },

        async getBuffetType(buffet_type_id){

            let data = this.buffet_types.find(item => item.id === buffet_type_id);

            this.buffet_type.id =  data.id;
            this.buffet_type.name =  data.name;
            this.buffet_type.description =  data.description;
            this.buffet_type.max_capacity_people =  data.max_capacity_people;
            this.buffet_type.min_capacity_people =  data.min_capacity_people;
            this.buffet_type.duration =  data.duration;
            this.buffet_type.alcoholic_beverages =  data.alcoholic_beverages;
            this.buffet_type.decoration =  data.decoration;
            this.buffet_type.parking_valet =  data.parking_valet;
            this.buffet_type.exclusive_address =  data.exclusive_address;
            this.buffet_type.visible = false;
        }
    }
  })
  
  app.mount('#app');