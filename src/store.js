import { reactive } from "vue";

export const store = reactive({
    // data here
    backEndLink: "http://127.0.0.1:8000",
    foods: [],

    types: "",
    restaurants: [],
    
    type: null,
    restaurant: {},
    cart: [],
});
