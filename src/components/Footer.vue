<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <span>
          <strong>Agendei</strong>
          por <a href="mailto:nelio@firstbits.com.br">FirstBits</a>.
          Todos os direitos reservados.
        </span>
        <span class="icons">
          <a href="http://twitter.com/agendei">
            <font-awesome-icon :icon="['fab', 'twitter-square']" />
          </a>
          <a href="http://instagram.com/agendei.io">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
        </span>
      </p>
    </div>
  </footer>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #333c44;
  padding: 2em 1.5em;

  @media screen and (max-width: 768px) {
    padding: 1.5em 1em;
  }

  .content {
    color: #d9d9d9;

    .icons {
      margin-left: 20px;

      a {
        font-size: 20px;
      }

      a + a {
        margin-left: 10px;
      }
    }

    p {

      strong {
        color: #FFFFFF;
      }

      a {
        color: #d9d9d9;
        text-decoration: underline;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

