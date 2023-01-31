<template>
  <k-dialog>
    <div class="container-fluid">
      <div class="row">
        <div class="col px-0">
          <k-button @click="$emit('closeAdminSendComment')" class="k-button--secondary rounded-0" :theme-color="'primary'">
            Cancel
          </k-button>
        </div>
        <div class="col text-center align-self-center fw-bold">
          <p class="text-center fw-bold fs-6">Send Comment</p>
        </div>
        <div class="col text-end px-0">
          <k-button @click="$emit('sendComment', commentMessage)" class="text-white rounded-0">
            Send
          </k-button>
        </div>
      </div>
      <div class="row pt-4">
        <div class="col p-0 border">
          <Editor
              :tools="tools"
              :default-content="commentMessage"
              :content-style="{height: '30rem'}"
              :keyboard-navigation="true"
              @change="onChange"
          />
        </div>
      </div>
    </div>
  </k-dialog>
</template>

<script>
import { Editor } from "@progress/kendo-vue-editor";
export default {
  name: "Admin Send Comment",
  components: {Editor},
  data() {
    return {
      tools: [
        ["Bold", "Italic", "Underline"],
        ["Undo", "Redo"],
        ["Link", "Unlink"],
        ["AlignLeft", "AlignCenter", "AlignRight","AlignJustify"],
        ["Indent", "Outdent"],
        // ["OrderedList", "UnorderedList", "Indent", "Outdent"],
      ],
      commentMessage: `<p><br><br><br><br><br><br><br><br></p>`
    };
  },
  methods: {
    onChange(event) {
      this.commentMessage = event.html;
    }
  }
};
</script>
