import { defineStore } from "pinia";
import axios from "axios";

export const patientStore = defineStore("patient", {
  state: () => ({
    data: "",
  }),
  actions: {
    async login(data) {
      try {
        await axios
          .post("http://localhost:5001/api/v1/patient/signin", data)
          .then((response) => {
            this.data = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
