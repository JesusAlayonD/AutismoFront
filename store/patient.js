import { defineStore } from "pinia";
import axios from "axios";

export const patientStore = defineStore("patient", {
  state: () => ({
    id: "",
  }),
  actions: {
    async login(data) {
      try {
        console.log(data);

        await axios
          .post("http://localhost:5001/api/v1/patient/signin", data)
          .then((response) => {
            this.id = response.data._id;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
