<template>
  <div class="tiny-edit">
    <editor v-model="myValue" :init="init" :disabled="disabled"></editor>
  </div>
</template>

<script>
// import axios from "axios";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
//#region 插件引入
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/icons/default/icons";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/hr";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/importcss";
import "tinymce/plugins/autolink";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/legacyoutput";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/print";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/autosave";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/bbcode";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/colorpicker";
//#endregion
export default {
  name: "TinyEdit",
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: `link lists image code table wordcount
         preview searchreplace autolink directionality 
         visualblocks visualchars fullscreen media template 
         codesample charmap hr nonbreaking insertdatetime 
         advlist lists imagetools  autoresize print`,
    },
    toolbar: {
      type: [String, Array],
      default: `bold italic underline strikethrough | 
      fontsizeselect fontselect forecolor backcolor | 
      alignleft aligncenter alignright alignjustify | 
      bullist numlist | outdent indent blockquote | undo redo | 
      link unlike code | removeformat `,
    },
  },
  data() {
    return {
      init: {
        language_url: "../../../plugins/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "../../../plugins/tinymce/skins/ui/oxide",
        content_css: "../../../tinymce/mycontent.css",
        height: "700px",
        width: "100%",
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,
        zIndex: 1000,
      },
      myValue: this.value,
    };
  },
  mounted() {
    tinymce.init({});
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style>
</style>