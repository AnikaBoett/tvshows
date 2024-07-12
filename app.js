const URL = "http://localhost:8080"

Vue.createApp({
    data() {
        return {
            shows: [],
            newTVShow: {
                title: "",
                seasons: "", 
                genre: "",
            },
        };
    },

    methods: {
        //GET method
        getShows: async function() {
            let response = await fetch(`${URL}/tvshows`);
            let data = await response.json();
            this.shows = data;
            console.log(data);
        },

        //POST method
        addShow: async function() {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let encodedData = 
            "title=" 
            + encodeURIComponent(this.newTVShow.title) + "&seasons=" 
            + encodeURIComponent(this.newTVShow.seasons) + "&genre=" 
            + encodeURIComponent(this.newTVShow.genre);

            let requestOptions = {
                method: "POST",
                body: encodedData,
                headers: myHeaders,
            };

            let response = await fetch(`${URL}/tvshows`, requestOptions);

            if(response.status === 201) {
                let data = await response.json();
                this.expenses.push(data);
                this.newTVShow.title = "";
                this.newTVShow.seasons = "";
                this.newTVShow.genre = "";
            } else {
                alert("Failed to create expense");
            }
        },

        //DELETE method
        deleteShow: async function(index) {
            let requestOptions = {
                method: "DELETE",
            };

            let showId = this.tvshows[index]._id;
            let response = await fetch(`${URL}/tvshows/${showId}`, requestOptions);
            if(response.status == 204) {
                this.tvshows.splice(index, 1);
            } else {
                alert("Failed to Delete Show.");
            }
        },

        //Update method
        updateShow: async function () {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let encodedData = 
            "description=" 
            + encodeURIComponent(this.modal.description) + "&amount=" 
            + encodeURIComponent(this.modal.amount) + "&category=" 
            + encodeURIComponent(this.modal.category);
            
            let requestOptions = {
                method: "PUT",
                body: encodedData,
                headers: myHeaders,
            };

            let expId = this.expenses[this.modal.index]._id;
            
            let response = await fetch(`${URL}/expenses/${expId}`, requestOptions);
            if (response.status == 204) {
                let exp = this.expenses[this.modal.index];
                exp.description = this.modal.description;
                exp.amount = parseFloat(this.modal.amount);
                exp.category = this.modal.category;
            } else {
                alert("Failed to update expense");
            }
            this.toggleModal();
        },
    },
    computed: {

    },
    created: function() {
        console.log("app created");
        this.getShows();
    }
}).mount("#app");