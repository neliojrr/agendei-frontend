<template>
  <footer class="footer">
    <div class="container">
      <div class="content columns is-mobile is-multiline">
        <div class="agendei column is-2-desktop is-12-touch is-flex">
          <h3 class="subtitle is-4">Agendei</h3>
          <span class="icons">
            <a target="_blank" href="http://twitter.com/agendei">
              <font-awesome-icon :icon="['fab', 'twitter-square']" />
            </a>
            <a target="_blank" href="http://instagram.com/agendei.io">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </span>
        </div>
        <div class="column is-offset-1-desktop is-6-mobile company">
          <h4 class="subtitle is-6">Empresa</h4>
          <ul>
            <li>
              <a href="/">Página Inicial</a>
            </li>
            <li>
              <a href="https://blog.agendei.io">Blog</a>
            </li>
            <li>
              <a href="mailto:contato@agendei.io">Contato</a>
            </li>
            <li>
              <a href="https://agendei.io/termos">Termos de Uso</a>
            </li>
            <li>
              <a href="https://agendei.io/privacidade">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>
        <div class="column company is-6-mobile">
          <h4 class="subtitle is-6">Produto</h4>
          <ul>
            <li>
              <a href="https://agendei.io/cadastrar">Cadastrar</a>
            </li>
            <li>
              <a href="https://agendei.io/login">Entrar</a>
            </li>
            <li>
              <a href="https://agendei.io/precos">Preços</a>
            </li>
          </ul>
        </div>
        <div class="column copyright is-flex">
          <span>
            <strong>Agendei</strong>
            por <a href="mailto:nelio@firstbits.com.br">FirstBits</a>.<br />
            Todos os direitos reservados.
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #333c44;
  padding: 2em 1.5em;

  @media screen and (max-width: 768px) {
    padding: 1em 1em;
  }

  .content {
    color: #d9d9d9;

    .agendei {
      flex-direction: column;
      border-right: 1px solid white;
      justify-content: center;
      height: 50%;
      margin: auto;

      @media screen and (max-width: 768px) {
        border: 0;
      }

      h3 {
        color: #ffffff;
      }

      .icons {
        a {
          font-size: 20px;
          color: white;
          font-size: 36px;
        }

        a + a {
          margin-left: 10px;
        }
      }
    }

    .company {
      text-align: left;

      @media screen and (max-width: 768px) {
        text-align: center;
      }

      h4 {
        color: white;
        margin-bottom: 0;
      }

      ul {
        list-style: none;
        margin-left: 0;

        a {
          color: white;
          font-size: 13px;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }

    .copyright {
      align-items: center;
      justify-content: center;
      font-size: 14px;

      strong {
        color: #ffffff;
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
