<template>
  <!-- eslint-disable -->
  <div class="home">
    <Nav :transparent="transparent" />
    <section class="app-info container section">
      <h1 class="title is-1 is-size-3-touch">
        Política de Privacidade
      </h1>
      <div class="content">
        <p>
          A política de privacidade constante deste documento integra os termos e condições gerais de Uso da plataforma agendei.io, que podem ser acessados por meio do link <a href="https://agendei.io/privacidade">https://agendei.io/privacidade</a>.
        </p>
        <p>
          A construção da presente política, baseia-se em princípios e valores básicos da FirstBits – Me, tais como a proteção das informações de seus usuários bem como na segurança de navegação em sua plataforma.
        </p>
        <p>
          A proteção aos usuários da plataforma em questão será garantida nos seguintes termos:
        </p>
        <h3 class="title is-4">1 - Do Armazenamento dos Dados</h3>
        <p>
          Serão armazenados pela plataforma agendei.io dados pessoais (Nome Completo, CPF, email, telefone e endereço residencial) dos usuários, que serão fornecidos para fins de efetivação de cadastro.
        </p>
        <p>
          A FirstBits se reserva o direito de consultar os dados pessoais fornecidos por seus usuários junto a birôs de crédito e outros big datas que julgar necessário para sua validação.
        </p>
        <p>
          Os dados de pagamento(número do cartão, nome impresso, data de validade e código de segurança) daqueles usuários que optarem por realizar pagamentos via cartão de crédito por meio da plataforma agendei.io também serão armazenados, a fim de viabilizar a intermediação de pagamentos.
        </p>
        <p>
          A armazenagem dos dados tem como finalidade principal garantir a segurança e a usabilidade da plataforma agendei.io, podendo ser realizados cruzamentos entre os dados pessoais e os dados de pagamento para avaliar a fidedignidade de operações realizadas por meio da plataforma.
        </p>
        <p>
          Sobretudo os dados pessoais serão armazenados por tempo indeterminado, a fim de garantir a observância aos Termos e Condições Gerais de Uso, principalmente naquilo que toca a unicidade da utilização dos referidos dados. Mesmo após o cancelamento do perfil na plataforma agendei.io, os dados pessoais dos usuários se sujeitam à presente Política de Privacidade.
        </p>
        <p>
          A qualquer momento, os usuários poderão consultar seus dados pessoais ou seus dados de pagamento, respectivamente, por meio das abas <span style="color: red">“Minha conta”</span>.
        </p>
        <p>
          Além dos dados pessoais e dos dados de pagamento dos usuários, a plataforma agendei.io também armazenará seus dados de acesso (IP, cookies, históricos de consultas, etc.) pelo prazo de 6 (seis) meses, nos termos do art. 15 da Lei 12.965/2014.
        </p>
        <h3 class="title is-4">
          2 – Da Utilização dos dados armazenados
        </h3>
        <p>
          Os dados armazenados na plataforma agendei.io poderão ser utilizados sempre com vistas ao aprimoramento da experiência de seus usuários.
        </p>
        <p>
          Como consequência das atividades desempenhadas por meio da plataforma agendei.io, os dados pessoais dos usuários serão compartilhados com os ESTABELECIMENTOS licenciados quando o primeiro adicionar o segundo como “salão”, na forma descrita nos Termos e Condições Gerais de Uso, garantindo-se assim a necessária interação entre ESTABELECIMENTO e usuário.
        </p>
        <p>
          Uma vez compartilhado com os ESTABELECIMENTOS licenciados, os dados pessoais dos usuários poderão ser utilizados por aqueles, para inclusão em mailings e mídias sócias próprias, sendo que sua utilização indevida dos dados em seu âmbito será de única e exclusiva responsabilidade do ESTABELECIMENTO.
        </p>
        <p>
          Além da utilização direta junto aos ESTABELECIMENTOS licenciados, os dados pessoais dos usuários da plataforma agendei.io  poderão também ser utilizados em pesquisas de mercado, elaboração de massa crítica estatística e ações de marketing. A utilização dos dados para quaisquer das finalidades descritas neste parágrafo dar-se-á sem a referência direta ao usuário, garantindo-se assim sua privacidade.
        </p>
        <p>
          Os dados dos usuários servirão para a análise de preferências e direcionamento de publicidades e promoções que melhor se adequem a seus interesses.
        </p>
        <h3 class="title is-4">
          3 – Das Comunicações entre usuários e a FirstBits
        </h3>
        <p>
          Eventuais correios eletrônicos trocados entre os usuários da plataforma agendei.io e a FirstBits poderão, de igual forma, serem armazenados, sobretudo para garantir àqueles a melhor experiência possível de navegação.
        </p>
        <h3 class="title is-4">
          4 – Das Disposições Gerais
        </h3>
        <p>
          A proteção aos dados dos usuários regulamentada pela presente Política de Privacidade não se estende à senha de acesso à plataforma agendei.io, cabendo aos próprios usuários sua guarda e manutenção.
        </p>
        <p>
          Quaisquer invasões à plataforma agendei.io ou interceptações ativas dos dados nela armazenados serão compreendidas como caso fortuito, não sendo oponível à FirstBits qualquer prejuízo delas decorrentes.
        </p>
        <p>
          Ficam advertidos os usuários de que, a qualquer momento, mediante ordem judicial, os dados armazenados na plataforma agendei.io  poderão ser divulgados às autoridades competentes, nos limites da legislação vigente.
        </p>
        <p>
          Consultas por autoridades administrativas aos dados armazenados na plataforma Agendei.io  também poderão ocorrer, nas situações previstas no artigo 10, §3º da Lei 12.965/2014.
        </p>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Nav,
    Footer
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: 'Termos de Uso'
    }
  },
  data() {
    return {
      transparent: 100
    };
  }
};
</script>

<style lang="scss">
.home {
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: hidden;

  .app-info {
    margin-top: 2em;
    margin-bottom: 14em;

    .content {
      text-align: justify;
      margin-top: 5em;
      margin-bottom: 10em;

      p {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 18px;
      }
    }
  }
}
</style>
