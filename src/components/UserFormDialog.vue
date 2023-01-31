<template>
  <div class="p-3">
    <table class="table">
      <thead>
        <tr class="fw-bold text-center fs-5">
          <th class="border border-white border-0"></th>
          <th class="border border-white border-0">User</th>
          <th class="border border-white border-0">Email</th>
          <th class="border border-white border-0">Password</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!isNewSession"
          v-for="(user, index) in store.posSessionsFetch[posIndex].users"
          :key="index">
          <td class="p-0">
            <button
              @click="deleteUserField(index)"
              class="btn m-0 p-0 text-center border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="fw-bold bi bi-dash-circle text-danger m-2"
                viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
              </svg>
            </button>
          </td>
          <td>
            <k-input
              v-model="user.name"
              type="text"
              class="bg-light"
              required="true"
              :wrapper-class="
                store.mandatoryFieldBoxPos[posIndex].users
                  ? 'mandatory-field'
                  : ''
              " />
          </td>
          <td>
            <k-input
              v-model="user.email"
              type="email"
              class="bg-light"
              required="true"
              :wrapper-class="
                store.mandatoryFieldBoxPos[posIndex].users
                  ? 'mandatory-field'
                  : ''
              " />
          </td>
          <td>
            <k-input
              v-model="user.password"
              type="password"
              class="bg-light"
              required="true"
              :wrapper-class="
                store.mandatoryFieldBoxPos[posIndex].users
                  ? 'mandatory-field'
                  : ''
              " />
          </td>
        </tr>
        <tr
          v-if="isNewSession"
          v-for="(newUser, index) in store.posSessionsAdd[newPosIndex].users">
          <td class="p-0">
            <button
              @click="deleteUserField(index)"
              class="btn m-0 p-0 text-center border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="fw-bold bi bi-dash-circle text-danger m-2"
                viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
              </svg>
            </button>
          </td>
          <td>
            <k-input
              v-model="newUser.name"
              :wrapper-class="
                store.mandatoryFieldBoxPosAdd[newPosIndex].users
                  ? 'mandatory-field'
                  : ''
              "
              type="text"
              class="bg-light"
              required="true" />
          </td>
          <td>
            <k-input
              v-model="newUser.email"
              :wrapper-class="
                store.mandatoryFieldBoxPosAdd[newPosIndex].users
                  ? 'mandatory-field'
                  : ''
              "
              type="email"
              class="bg-light"
              required="true" />
          </td>
          <td>
            <k-input
              v-model="newUser.password"
              :wrapper-class="
                store.mandatoryFieldBoxPosAdd[newPosIndex].users
                  ? 'mandatory-field'
                  : ''
              "
              type="password"
              class="bg-light"
              required="true" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row mx-0">
      <div class="col text-center d-flex justify-content-end">
        <k-button
          @click="addUser"
          class="rounded-0 text-white fs-6 fw-bold border-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-plus"
            viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add More User
        </k-button>
      </div>
    </div>
  </div>
  <!-- </k-dialog> -->
</template>

<script>
import { Window } from "@progress/kendo-vue-dialogs";
import { useStoreStore } from "./../stores/StoreStore";

export default {
  name: "User Form Dialog",
  setup() {
    const store = useStoreStore();

    return { store };
  },
  components: {
    window: Window,
  },
  props: ["posIndex", "newPosIndex", "isNewSession"],
  data() {
    return {};
  },
  methods: {
    addUser() {
      if (this.isNewSession) {
        this.store.posSessionsAdd[this.newPosIndex].users.push({
          name: "",
          email: "",
          password: "",
        });
      } else {
        this.store.posSessionsFetch[this.posIndex].users.push({
          name: "",
          email: "",
          password: "",
        });
      }
    },
    deleteUserField(index) {
      if (this.isNewSession) {
        this.store.posSessionsAdd[this.newPosIndex].users.splice(index, 1);
      } else {
        this.store.posSessionsFetch[this.posIndex].users.splice(index, 1);
      }
    },
  },
};
</script>

<style></style>
