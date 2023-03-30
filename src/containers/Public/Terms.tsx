import React from 'react'
import { Typography, Row, Col, Layout } from 'antd'
import PublicTopic from './components/PublicTopic'

const Terms: React.FC = () => {
  return (
    <>
      <Layout style={{ backgroundColor: '#FCFCFC', height: '100vh' }}>
        <Row
          gutter={[24, 24]}
          style={{ width: '100%', margin: '0px' }}
          justify='center'
          align='middle'
        >
          <Col xs={{ span: 24 }} lg={{ span: 20 }}>
            <PublicTopic
              title='Termos de uso'
              description='Publicado em 13/10/2020.'
            />
          </Col>
        </Row>
        <Row
          gutter={[24, 24]}
          style={{ width: '100%', margin: '0px' }}
          justify='center'
          align='middle'
        >
          <Col xs={{ span: 20 }} lg={{ span: 20 }}>
            <Typography.Paragraph>
              Seja bem-vindo(a) ao site do YmmuCard! Esta plataforma foi
              desenvolvida e é controlada pela Ymmunos Startup. Por favor, leia
              atentamente os termos e condições abaixo estipulados para que você
              possa usufruir dos nossos serviços disponíveis.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Seu acesso e utilização representam sua aceitação integral e
              incondicional aos Termos de Uso. Assim, você concorda em cumprir
              estes Termos de Serviço, todas as leis e regulamentos aplicáveis
              ​​e concorda que é responsável pelo cumprimento de todas as leis
              locais aplicáveis. Se você não concordar com algum desses termos,
              está proibido de usar ou acessar este site. nossos serviços.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Os materiais contidos neste site são protegidos pelas leis de
              direitos autorais e marcas comerciais aplicáveis. A{' '}
              <a href='/politica-de-privacidade'>Política de Privacidade</a> do
              Aplicativo integra os presentes Termos de Uso. Para fim destes
              Termos de Uso, os “Usuários” são todas as pessoas físicas que de
              qualquer forma integram, acessam ou utilizam nossos serviços.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <ul>
                <li>
                  <a href='#objetivo'>Objetivo do YmmuCard</a>
                </li>
                <li>
                  <a href='#usability'>Uso do YmmuCard por você</a>
                </li>
                <li>
                  <a href='#user-register'>Cadastro de usuários</a>
                </li>
                <li>
                  <a href='#exemption-responsibility'>
                    Isenção de responsabilidade
                  </a>
                </li>
                <li>
                  <a href='#restrictions'>Obrigações e restrições</a>
                </li>
                <li>
                  <a href='#use-and-license'>Uso de Licença</a>
                </li>
                <li>
                  <a href='#final'>Considerações Finais</a>
                </li>
              </ul>
            </Typography.Paragraph>
            <Typography.Title
              id='objetivo'
              level={2}
              style={{ textAlign: 'center' }}
            >
              Objetivo do YmmuCard
            </Typography.Title>
            <Typography.Paragraph>
              A Ymmunos desenvolveu e mantém o YmmuCard para fins de controle
              das informações de imunização. Esse serviço destina-se àqueles que
              buscam um melhor gerenciamento de suas informações vacinais,
              abrangendo o público geral e profissionais na saúde. O serviço que
              o YmmuCard oferece não procura substituir o cartão de vacina
              físico, pois este ainda vale como documento oficial de imunização,
              mas tem o objetivo de facilitar o gerenciamento e organização da
              rotina de vacinação dos Usuários. São disponibilizadas informações
              educativas de acordo com as orientações vacinais atualizadas pelo
              Ministério da Saúde, mas estas não devem ser interpretadas como
              definitivas ou exatas, bem como não pretendem substituir as
              discussões estabelecidas entre médicos e pacientes ou algum
              diagnóstico médico completo, ou ainda, estimular a automedicação
              ou auto vacinação. As informações contidas no Sistema não devem
              ser utilizadas para diagnosticar problemas de saúde ou doenças.
              Consulte sempre um profissional de saúde. Qualquer tratamento deve
              ser conduzido por profissionais autorizados, que levem em
              consideração as características pessoais dos pacientes. A Ymmunos
              fará o esforço para incluir informações precisas e atualizadas. No
              entanto, a Ymmunos não dá qualquer garantia ou assume
              responsabilidade quanto a confiabilidade, exatidão, validade,
              atualidade, utilidade, integridade, pertinência, oportunidade ou
              abrangência de tais questões ou informações. As informações
              disponibilizadas no Sistema podem incluir imprecisões técnicas,
              pois depende das informações fornecidas pelo usuário e, assim
              sendo, caso as informações fornecidas sejam imprecisas, as
              sugestões de vacinação poderão ser alteradas. A Ymmunos poderá
              fornecer links terceiros de outros websites, publicações médicas
              ou de órgãos relacionados, mas ressalva que não se responsabiliza
              por qualquer conteúdo, propaganda, produtos, serviços ou outros
              materiais contidos ou disponibilizados por meio de tais websites
              ou recursos, além de não ter controle sobre tais endereçamentos.
            </Typography.Paragraph>
            <Typography.Title
              id='usability'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Uso do YmmuCard por você
            </Typography.Title>
            <Typography.Paragraph>
              A sua participação no site do YmmuCard se dá por meio do
              preenchimento, mediante consentimento específico prévio, das
              vacinas já tomadas e do registro das próximas doses, em
              conformidade com o Calendário Anual de Imunização fornecido pelo
              Ministério da Saúde. A qualquer momento, o usuário poderá fazer a
              consulta das vacinas recomendadas pela plataforma. Assim que uma
              vacina for tomada pelo usuário, é seu papel fazer o registro no
              Sistema, além de registrar as doses futuras.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>
                É de extrema importância que os dados fornecidos sejam corretos
                e precisos, pois a plataforma recomenda as vacinas com base no
                perfil de cada usuário cadastrado. CASO AS INFORMAÇÕES FORNECIDA
                SEJAM IMPRECISAS, AS RECOMENDAÇÕES DE VACINAÇÃO PODERÃO
                IGUALMENTE SER IMPRECISAS.
              </strong>
            </Typography.Paragraph>

            <Typography.Title
              id='user-register'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Cadastro de usuários
            </Typography.Title>
            <Typography.Paragraph>
              O YmmuCard só pode ser utilizado por pessoas que incluírem seus
              dados obrigatórios de cadastro. Assim, ao se cadastrar, o Usuário
              declara, sob pena da Lei, ser maior de idade e estar ciente de
              seus direitos civis. Se o Usuário estiver representando alguma
              pessoa física, este declara ter plenos poderes de representação.
            </Typography.Paragraph>
            <Typography.Paragraph>
              O Usuário deve completar o cadastro com informações exatas,
              precisas e verdadeiras, caso contrário, ele deve arcar com
              qualquer declaração cadastral falsa ou omissa. A Ymmunos não faz
              qualquer verificação quanto à autenticidade dos dados de seus
              Usuários, mas de todo modo, caso tomemos ciência de qualquer dado
              cadastral falso ou omisso, iremos excluir o cadastro do referido
              Usuário e suas respectivas informações.
            </Typography.Paragraph>
            <Typography.Paragraph>
              O usuário deve notificar a equipe da Ymmunos imediatamente, por
              meio dos contatos ao final deste Termo, sobre qualquer violação de
              segurança ou uso não autorizado de seu cadastro para que medidas
              de segurança sejam tomadas.
            </Typography.Paragraph>
            <Typography.Title
              id='exemption-
                responsibility'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Isenção de responsabilidade
            </Typography.Title>
            <Typography.Paragraph>
              Os materiais no site do YmmuCard são fornecidos “como estão”. A
              Ymmunos não oferece garantias, expressas ou implícitas e, por este
              meio, isenta e nega todas as outras garantias, incluindo, sem
              limitação, garantias implícitas ou condições de comercialização,
              adequação a um fim específico ou não violação de propriedade
              intelectual ou outra violação de direitos.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Além disso, o YmmuCard não garante ou faz qualquer representação
              relativa à precisão, aos resultados prováveis ​​ou à
              confiabilidade do uso dos materiais em seu site ou de outra forma
              relacionado a esses materiais ou em sites vinculados a este site.
            </Typography.Paragraph>
            <Typography.Title
              id='restrictions'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Obrigações e restrições
            </Typography.Title>
            <Typography.Paragraph>
              É vedado ao Usuário:
              <ul>
                <li>
                  Qualquer demonstração de violência, fraude ou prática de
                  condutas ilícitas que prejudique os Usuários e a Ymmunos.
                </li>

                <li>
                  Alteração de qualquer nota, banner, signo distintivo ou marca
                  da Ymmunos.
                </li>

                <li>
                  Uso dispositivos, sistemas automáticos ou qualquer outro
                  recurso que possa interferir a segurança do Sistema.
                </li>
              </ul>
            </Typography.Paragraph>
            <Typography.Paragraph>
              A Ymmunos poderá advertir quaisquer ações reconhecidas como
              danosas, além de aplicar as medidas que entender cabíveis. O
              Usuário que infringir os presentes Termos de Uso e/ou a Política
              de Privacidade será responsabilizado pelos danos e prejuízos de
              qualquer natureza que a Ymmunos venha a sofrer ou aqueles causados
              a terceiros, sem limitação. Qualquer consideração de que o Sistema
              esteja seja usado de forma indevida, o Usuário deve entrar em
              contato com a Equipe Ymmunos para que medidas necessárias sejam
              tomadas.
            </Typography.Paragraph>
            <Typography.Title
              id='use-and-license'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Uso de Licença
            </Typography.Title>
            <Typography.Paragraph>
              <ul>
                <li>Modificar ou copiar os materiais; </li>
                <li>
                  Usar os materiais para qualquer finalidade comercial ou para
                  exibição pública (comercial ou não comercial);{' '}
                </li>
                <li>
                  Tentar descompilar ou fazer engenharia reversa de qualquer
                  software contido no site do YmmuCard;{' '}
                </li>
                <li>
                  Remover quaisquer direitos autorais ou outras notações de
                  propriedade dos materiais; ou
                </li>
                <li>
                  Transferir os materiais para outra pessoa ou 'espelhe' os
                  materiais em qualquer outro servidor.
                </li>
              </ul>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Esta licença será automaticamente rescindida se você violar alguma
              dessas restrições e poderá ser rescindida por YmmuCard a qualquer
              momento. Ao encerrar a visualização desses materiais ou após o
              término desta licença, você deve apagar todos os materiais
              baixados em sua posse, seja em formato eletrónico ou impresso.
            </Typography.Paragraph>
            <Typography.Title
              id='final'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Propriedade intelectual
            </Typography.Title>
            <Typography.Paragraph>
              Todos os direitos de propriedade intelectual relativos a este
              Sistema são reservados à Ymmunos Startup.
            </Typography.Paragraph>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>
              Alterações nestes Termos de Uso
            </Typography.Title>
            <Typography.Paragraph>
              A Ymmunos reserva-se ao direito de, a qualquer momento e a seu
              exclusivo critério, modificar, alterar ou atualizar os presentes
              Termos de Uso. Caso isso aconteça, os usuários serão avisados.
            </Typography.Paragraph>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>
              Entre em contato conosco
            </Typography.Title>
            <Typography.Paragraph>
              <strong>
                Quaisquer dúvidas sobre estes termos, críticas, sugestões e/ou
                reclamações, por favor, fale com a gente através do endereço de
                e-mail contato@ymmunos.com.br
              </strong>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Versão 1.0. 2020. Todos os direitos reservados. Outubro/2020.
            </Typography.Paragraph>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export default Terms
