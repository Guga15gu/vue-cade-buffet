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
            payment_methods: ''
        },
        visibleBuffet: false
      };
    },

    async mounted(){
        await this.getBuffets();
    },

    methods:{

        async showBuffet(id){
            this.visibleBuffet = !this.visibleBuffet;
            await this.getBuffet(id);
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

        async getBuffet(id){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${id}`);
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
        },
    }
  })
  
  app.mount('#app');