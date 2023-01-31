<template>
  <k-dialog>
    <div class="container-fluid">
      <div class="row">
        <div class="col text-center align-self-center fw-bold">
          <p class="text-center fw-bold fs-2" style="color: #c96340">
            Help Desk
          </p>
        </div>
        <p class="mt-4 text-center fw-bold">We are ready to help!</p>
        <p class="mt-2 text-center">
          Please input your questions or queries below and click Send button to
          send your message to the Wooshfood admin email address.
        </p>
      </div>
      <div class="pt-4">
        <div class="p-0 border">
          <ktextarea
            v-model="helpMessage"
            :auto-size="true"
            style="height: 250px"
            :rows="10" />
        </div>
        <div class="row mt-4">
          <div class="col">
            <k-button
              @click="$emit('closeAdminSendHelpMessage')"
              class="k-button--secondary rounded-0"
              :theme-color="'primary'">
              Cancel
            </k-button>
          </div>
          <div class="col text-end">
            <k-button
              @click="$emit('sendHelpMessage', helpMessage)"
              class="text-white rounded-0">
              Send
            </k-button>
          </div>
        </div>
      </div>
    </div>
  </k-dialog>
</template>

<script>
import { Editor } from "@progress/kendo-vue-editor";
import { TextArea } from "@progress/kendo-vue-inputs";
export default {
  name: "Admin Send Comment",
  components: { Editor, ktextarea: TextArea },
  data() {
    return {
      tools: [
        ["Bold", "Italic", "Underline"],
        ["Undo", "Redo"],
        ["Link", "Unlink"],
        ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
        ["Indent", "Outdent"],
        // ["OrderedList", "UnorderedList", "Indent", "Outdent"],
      ],
      helpMessage: "",
    };
  },
  methods: {
    onChange(event) {
      this.commentMessage = event.html;
    },
  },
};
</script>
