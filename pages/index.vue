<template>
  <section class="container">
    <h1 class="title">API JSON-Server</h1>
    <h2 class="subtitle">Nama-nama Negara</h2>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="name" />
          </div>
        </div>
        <div class="control" v-bind:class="{hidden: !isHidden}">
          <button class="button is-link" @click="add(name)">Submit</button>
        </div>

        <div class="control" v-bind:class="{hidden: isHidden}">
          <button class="button is-link" @click="update()">Update</button>
        </div>
      </div>

      <div class="column">
        <ul class="panel">
          <li class="panel-heading">Daftar negara</li>
          <li class="panel-block">
            <input type="text" class="input is-small" v-model="searchKey" placeholder="Search"/>
          </li>
          <li class="panel-block" v-for="country in filteredCountries" :key="country.id">
            {{ country.name }} /
            <button class="button is-info" @click="get(country.id)">Edit</button> /
            <button class="button is-danger" @click="remove(country.id)">Hapus</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      name: "",
      isHidden: true,
      activeItem: null,
      searchKey: "",
      countries: this.$store.state.countries
    };
  },

  computed: {
    filteredCountries() {
      return this.countries.filter(
        country =>
          country.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !==
          -1
      );
    }
  },

  methods: {
    add(name) {
      this.$store.dispatch("submitData", name);
      //kosongkan field nama
      this.name = "";
      //link ke halaman lain
      this.$router.push("/");
    },

    remove(id) {
      this.$store.dispatch("removeData", id);
    },

    get(id) {
      this.$store.dispatch("getData", id).then(res => {
        this.name = res.name;
        this.activeItem = res;
        this.isHidden = false;
      });
    },

    update() {
      this.$store.dispatch("updateData", {
        id: this.activeItem.id,
        name: this.name
      });
      this.name = "";
      this.isHidden = true;
    }
  }
};
</script>

<style>
.hidden {
  display: none;
}
</style>