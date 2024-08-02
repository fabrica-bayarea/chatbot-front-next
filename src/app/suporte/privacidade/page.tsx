'use client';

import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

const Section = styled.section`
  background-color: white;
  border-radius: 16px;
  gap: 30px;
  height: fit-content;
  margin: 100px 25%;
  padding: 40px 60px;

  @media screen and (width <= 1024px) {
    margin: 100px 10%;
  }

  @media screen and (width <= 768px) {
    border-radius: 0;
    height: calc(100dvh - 50px);
    margin: 0;
    padding: 40px 20px;
  }
`;

const PrivacySection = styled(Section)`
  & > h1 {
    font-size: 2.25rem;
    margin-bottom: 40px;
  }

  & > h4 {
    font-size: 1rem;
    text-transform: uppercase;
  }

  & > h5 {
    font-size: 1rem;
  }

  & > p {
    line-height: 24px;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
  }

  ${mediaQueries.mobileL} {
    & > h1 {
      font-size: 1.5rem;
    }
  }
`;

function Rating() {
  return (
    <PrivacySection>
      <h1>Política de Privacidade</h1>
      <p>
        O Centro Universitário IESB, de propriedade do Centro de Educação Superior de
        Brasília LTDA (CNPJ 00.422.333/0001-09), com sede no SGAS, quadra 613/614, via L2
        Sul, Asa Sul, Brasília, Distrito Federal, CEP 70.200-730, é o responsável pelo
        tratamento dos dados pessoais dos &quot;USUÁRIOS&quot;, conforme definido na Lei
        Geral de Proteção de Dados (LGPD), Lei 13.709/2018.
      </p>
      <h4>Objetivos</h4>
      <p>
        O objetivo principal desta Política de Privacidade é fornecer clareza sobre como
        coletamos, armazenamos, utilizamos e protegemos os dados pessoais dos usuários que
        acessam e se cadastram nas plataformas disponibilizadas pelo IESB, em particular
        seu sistema de chat automatizado e atendimento humano - Chatbot IESB.
      </p>
      <h4>Coleta de Dados</h4>
      <p>
        Para estabelecer uma comunicação clara com os usuários, o ChatBot IESB solicitará
        dados por meio de formulário de cadastro para novos usuários (e-mail, nome, senha
        e foto).
      </p>
      <p>
        Durante o uso do ChatBot IESB e para a melhor prestação de serviços, as mensagens
        dos usuários serão registradas, e tanto o ChatBot quanto os colaboradores do IESB
        poderão solicitar novos dados a fim de melhorar as interações. Esses dados podem
        ser:
      </p>
      <ul>
        <li>
          Dados de identificação (nome completo, data de nascimento, gênero, CPF, RG,
          filiação);
        </li>
        <li>
          Dados de contato (e-mail e telefone), dados locacionais (país, estado, cidade,
          endereço residencial);
        </li>
        <li>Dados profissionais (cargo e nome da empresa em que você trabalha);</li>
        <li>
          Dados educacionais (grau de escolaridade, nome do curso, nome da instituição de
          ensino);
        </li>
        <li>Dados de faturamento (nome, CPF, endereço, cartão de crédito).</li>
      </ul>
      <h5>Dados Sensíveis</h5>
      <p>
        Durante o uso do ChatBot IESB, também poderemos coletar dados sensíveis, como
        religião, cor, dados médicos, deficiências físicas ou cognitivas, visando
        assegurar o seu acesso a direitos e a prestação adequada dos serviços.
      </p>
      <h5>Métodos de Coleta</h5>
      <p>
        Os dados serão coletados diretamente dos usuários por meio de formulários de
        cadastro e durante a interação com o ChatBot IESB, disponível no site da
        instituição.
      </p>
      <h4>Finalidades do Tratamento de Dados</h4>
      <p>Seus dados são tratados para viabilizar:</p>
      <ul>
        <li>
          O cadastro adequado nos sistemas e plataformas utilizadas para a prestação dos
          serviços;
        </li>
        <li>
          A oferta de serviços, promoções e condições especiais que possam ser do seu
          interesse e customização de ações de publicidade;
        </li>
        <li>
          O aprimoramento contínuo dos nossos serviços, por meio de atividades de
          pesquisa, análise e inovação;
        </li>
        <li>
          A comunicação adequada no que se refere a esclarecimento de dúvidas, suporte
          técnico;
        </li>
        <li>
          O cumprimento de determinações legais, judiciais, regulatórias ou
          administrativas e ofícios de autoridades competentes;
        </li>
        <li>
          O monitoramento de atividades e tendências de uso, assim como medição do nível
          de interação e engajamento em relação aos nossos serviços;
        </li>
        <li>A garantia da segurança patrimonial e de sua integridade física.</li>
      </ul>
      <h4>Uso de Cookies</h4>
      <h5>Definição e Finalidade</h5>
      <p>
        Utilizamos cookies e tecnologias semelhantes para melhorar a experiência do
        usuário, personalizar publicidade e recomendar conteúdo relevante. Os cookies são
        arquivos que identificam o usuário por meio da coleta de dados e podem
        personalizar a navegação em visitas futuras à mesma página.
      </p>
      <h5>Controle pelo Usuário</h5>
      <p>
        O usuário pode optar por bloquear o uso de cookies ao acessar o ChatBot IESB,
        seguindo as instruções fornecidas na caixa de diálogo (pop-up) exibida no canto
        inferior esquerdo da página. Ressalta-se que a desativação de todos os cookies
        pode impedir o funcionamento correto do site.
      </p>
      <h4>Medidas Técnicas e Organizativas</h4>
      <h5>Armazenamento e Segurança dos Dados</h5>
      <p>
        Os dados coletados são armazenados em servidores controlados e monitorados.
        Adotamos medidas técnicas e organizativas, conforme nossa Política de Segurança da
        Informação, para garantir que apenas operadores autorizados e registrados tenham
        acesso aos dados, visando prestar serviços exclusivamente de interesse do titular.
      </p>
      <h5>Acesso por Funcionários e Parceiros</h5>
      <p>
        Funcionários e parceiros que tenham acesso aos dados para realizar atividades
        vinculadas à prestação dos serviços estão sujeitos às mesmas regras e princípios
        de segurança e privacidade.
      </p>
      <h4>Integrações de Terceiros</h4>
      <p>
        Utilizamos Single Sign-On (SSO), como o Login com Google, para permitir que o
        usuário autentique sua conta usando um conjunto de informações de login de
        terceiros. Teremos acesso a certas informações de acordo com os procedimentos de
        autorização determinados por esses terceiros, incluindo, por exemplo, seu nome,
        nome de usuário, endereço de e-mail e foto do perfil. Usamos essas informações
        para operar, manter e fornecer a você os recursos e as funcionalidades do nosso
        serviço.
      </p>
      <h4>Período de Tratamento</h4>
      <p>
        Os dados dos usuários são armazenados durante o período da prestação dos serviços.
        Após este período, os dados podem ser mantidos conforme necessário para
        cumprimento de obrigações legais, judiciais ou regulatórias.
      </p>
      <h4>Compartilhamento de Dados Pessoais</h4>
      <p>Os dados pessoais podem ser compartilhados nas seguintes situações:</p>
      <ul>
        <li>
          Autoridades judiciais, administrativas e governamentais: Para cumprimento de
          determinações legais, judiciais e regulatórias;
        </li>
        <li>
          Polos parceiros: Para concretização de matrículas e prestação dos serviços
          adquiridos;
        </li>

        <li>
          Instituições financeiras e provedores de meios de pagamento: Para processar
          pagamentos dos serviços adquiridos;
        </li>

        <li>
          Prestadores de serviços: Para funções como cobrança, marketing, armazenamento em
          nuvem e auditoria externa.
        </li>
      </ul>
      <h4>Direitos do Titular</h4>
      <p>
        Os titulares de dados podem exercer seus direitos de acordo com a LGPD, incluindo:
      </p>
      <ul>
        <li>Consulta aos dados: Solicitar a relação dos dados pessoais armazenados;</li>
        <li>
          Correção de dados: Solicitar a correção de dados incompletos, incorretos ou
          desatualizados;
        </li>
        <li>
          Oposição ao tratamento: Manifestar oposição a determinadas operações de
          tratamento;
        </li>
        <li>Eliminação de dados: Solicitar a exclusão dos dados pessoais.</li>
      </ul>
      <p>
        Para exercer esses direitos, os titulares podem utilizar o Canal Direto ou o
        e-mail privacidade@iesb.br. O IESB poderá solicitar autenticação de identidade do
        titular, visando assegurar que nenhuma ação será executada sem autorização do
        titular e/ou que nenhuma informação será compartilhada com pessoas não
        autorizadas.
      </p>
      <h4>Incidentes de Dados</h4>
      <p>
        Em caso de incidentes de dados, o Encarregado de Dados entrará em contato com os
        titulares afetados e comunicará à Autoridade Nacional de Proteção de Dados (ANPD),
        ou ao Ministério Público.
      </p>
      <h4>Alterações na Política de Privacidade</h4>
      <p>
        Esta Política de Privacidade foi atualizada pela última vez em 25/07/2024, e
        poderá ser eventualmente alterada. Recomenda-se a leitura regular deste documento.
      </p>
    </PrivacySection>
  );
}

export default Rating;
