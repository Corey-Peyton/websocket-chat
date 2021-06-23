<template>
  <div :class="userMessage ? 'user-message' : 'interlocutor-message'">
    <section
      :class="
        userMessage ? 'user-message__header' : 'interlocutor-message__header'
      "
    >
      <span
        :class="
          userMessage
            ? 'user-message__header__username'
            : 'interlocutor-message__header__username'
        "
        >{{ message.sender }}</span
      >
      <span
        :class="
          userMessage
            ? 'user-message__header__time'
            : 'interlocutor-message__header__time'
        "
        >{{ formattedDate }}</span
      >
    </section>
    <section
      :class="userMessage ? 'user-message__body' : 'interlocutor-message__body'"
    >
      {{ message.content }}
    </section>
  </div>
</template>

<script>
export default {
  name: 'MessagesItem',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userMessage() {
      return this.$store.state.user.username === this.message.sender
    },
    formattedDate() {
      return this.message.sentAt.toLocaleString('en-UA', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

@mixin message(
  $isUser: false,
  $float: left,
  $headerColor: #becbd9,
  $usernameColor: #203245,
  $timeColor: #9aa8b7
) {
  min-height: 80px;
  width: 640px;
  margin: 0 20px 20px 20px;
  float: $float;

  &__header {
    height: 35px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $headerColor;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: 'OpenSans', sans-serif;

    &__username {
      color: $usernameColor;
    }

    &__time {
      color: $timeColor;
    }
  }

  &__body {
    min-height: 45px;
    padding: 15px;
    background-color: #f4f8fb;
    position: relative;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-family: 'OpenSans-Semibold', sans-serif;
    overflow-wrap: break-word;

    &::after {
      content: '';
      height: 15px;
      width: 15px;
      position: absolute;
      transform: rotate(45deg);
      bottom: 20px;
      background-color: #f4f8fb;

      @if $isUser {
        right: -5px;
      } @else {
        left: -5px;
      }
    }
  }
}

.interlocutor-message {
  @include message;
}

.user-message {
  @include message(
    $isUser: true,
    $float: right,
    $headerColor: #f0cbb3,
    $usernameColor: #703a18,
    $timeColor: #bba08e
  );
}

@media screen and (max-width: $md) {
  .interlocutor-message {
    width: 80%;
  }

  .user-message {
    width: 80%;
  }
}
</style>
