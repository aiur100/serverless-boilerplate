<template>
  <resource
    :columnDefs="columnDefs"
    resource_name="Workers"
    resource_singular="Worker"
    :mockData="mockData"
    :formSchema="schema"
    modalSize="xl"
  />
</template>
<script>
import Resource from "../components/Resource.vue";

export default {
  name: "Workers",
  components: {
    Resource,
  },
  data() {
    return {
      user: null,
      loading: true,
      getEndpoint: null,
      columnDefs: [
        { field: "name", resizable: true, flex: 1 },
        { field: "email", flex: 1 },
        { field: "last_login", flex: 1 },
      ],
      schema: [
        {
          label: "Name",
          key_name: "name",
          type: "text",
          place_holder: "Worker's name",
        },
        {
          label: "Email",
          key_name: "email",
          type: "email",
          place_holder: "Worker's email",
        },
      ],
      mockData: [
        {
          name: "Joe Schmoe",
          email: "chrishill9@gmail.com",
          last_login: "2021-08-03",
        },
        {
          name: "Joe Blow",
          email: "joeblow@gmail.com",
          last_login: "2021-08-01",
        },
        {
          name: "Joe NoNo",
          email: "joenono@gmail.com",
          last_login: "2021-08-02",
        },
      ],
    };
  },
  async beforeMount() {
    console.log({ url: this.$baseUrl });

  },
};
</script>
