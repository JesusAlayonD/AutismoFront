import { defineStore } from "pinia";
import axios from "axios";

export const doctorStore = defineStore("doctor", {
  state: () => ({
    data: "",
  }),
  actions: {
    async login(data) {
      try {
        await axios
          .post("http://localhost:5001/api/v1/doctor/signin", data)
          .then((response) => {
            this.data = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    async register(data) {
      try {
        await axios
          .post("http://localhost:5001/api/v1/doctor/", data)
          .then((response) => {
            this.data = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
