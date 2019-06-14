<template>
  <section>
    <div class="formarea">
      <h2>Say Hello</h2>
      <br>
      <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
        <p class="hidden">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field">
          </label>
        </p>
        <p>
          <label for="name">
            Name
            <br>
            <input id="name" type="name" name="name" v-model="$v.form.name.$model">
          </label>
        </p>
        <p v-if="errors" class="error">
          <span v-if="!$v.form.name.required">this field is required.</span>
          <span
            v-if="!$v.form.name.minLength"
          >Field must have at least {{ $v.form.name.$params.minLength.min }} characters.</span>
        </p>
        <p>
          <label for="email">
            Email
            <br>
            <input id="email" type="email" name="email" v-model="$v.form.email.$model">
          </label>
        </p>
        <p v-if="errors" class="error">
          <span v-if="!$v.form.email.required">this field is required.</span>
          <span v-if="!$v.form.email.email">Needs to be a valid email.</span>
        </p>
        <p>
          <label for="message">
            Message
            <br>
            <textarea id="message" name="message" rows="4" v-model="$v.form.message.$model"></textarea>
          </label>
        </p>
        <p v-if="errors" class="error">
          <span v-if="!$v.form.message.required">this field is required.</span>
          <span
            v-if="!$v.form.message.minLength"
          >Field must have at least {{ $v.form.message.$params.minLength.min }} characters.</span>
        </p>
        <p>
          <button type="submit" @click.prevent="handleSubmit">Send</button>
        </p>
        <p v-if="errors" class="error submiterror">
          The form above has errors,
          <br>please get your act together and resubmit
        </p>
        <p v-else-if="empty && uiState === 'submit clicked'" class="error submiterror">
          The form above is empty,
          <br>cmon y'all you can't submit an empty form!
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        message: null
      },
      uiState: "submit not clicked",
      errors: false,
      empty: true
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email
      },
      message: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = "submit clicked";
      if (this.errors === false && this.empty === false) {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({ "form-name": "contact", ...this.form })
        })
          .then(console.log("went through"))
          .then($nuxt._router.push("/thankyou"))
          .catch(error => console.log(error));

        this.uiState = "form submitted";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  width: 100vw;
  height: 700px;
  background: url("/ferns.svg") center center no-repeat $dark;
  background-size: cover;
  padding: 100px;
}

.formarea {
  background: rgba(0, 0, 0, 0.3);
  padding: 50px 100px 65px;
  border-radius: 10px;
  color: white;
  float: right;
  margin-right: 20vmin;
  width: 500px;
  h2 {
    text-align: center;
  }
  label,
  textarea,
  input {
    width: 100%;
  }
  .error {
    text-transform: uppercase;
    font-size: 14px;
    color: #e28a9d;
    position: absolute;
    line-height: 1.3;
    margin-top: -20px;

    font-family: sans-serif;
  }
  .submiterror {
    padding-top: 30px;
  }
}

@media screen and (max-width: 1000px) {
  section {
    padding: 8vmin;
    display: flex;
    justify-content: center;
    height: auto;
  }
  .formarea {
    margin-right: 0;
    float: none;
    padding: 3vmin 3vmin 6vmin;
    background: none;
  }
}
</style>