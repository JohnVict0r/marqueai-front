import React from 'react'
import { Typography, Row, Col, Layout } from 'antd'
import PublicTopic from '../components/PublicTopic'

const PrivacyPolicy: React.FC = () => {
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
              title='Política de privacidade'
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
              A Ymmunos tem o compromisso de respeitar a sua privacidade e criou
              esta Política de Privacidade para proporcionar um claro
              entendimento de como funciona o nosso Serviço/Sistema e como são
              tratados os dados de identificação pessoal.
            </Typography.Paragraph>
            <Typography.Paragraph>
              É política do YmmuCard priorizar a sua privacidade em relação a
              qualquer informação sua que possamos coletar nestes e em outros
              sites que possuímos e operamos.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Por favor, recomendamos que a Política de Privacidade abaixo seja
              lida com atenção. Ela descreve como são tratadas as informações
              pessoais fornecidas pelos Usuários ao acessar e utilizar o
              Sistema. Ao usar o Sistema, o usuário reconhece os termos e
              condições desta Política de Privacidade e concorda estar vinculado
              a eles de forma livre e espontânea. Ao usar o Sistema o Usuário
              autoriza a coleta e uso de informações conforme estabelecido nesta
              Política de Privacidade.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </Typography.Paragraph>
            <Typography.Paragraph>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto conosco
            </Typography.Paragraph>
            {/* <Typography.Paragraph>
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
            </Typography.Paragraph> */}
            <Typography.Title
              id='coleta'
              level={2}
              style={{ textAlign: 'center' }}
            >
              Coleta e uso das informações
            </Typography.Title>
            <Typography.Paragraph>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Os dados no
              cadastro são: nome, CPF, e-mail, data de nascimento, gênero,
              estado e cidade onde o Usuário reside. A coleta é realizada por
              meios justos e legais, com o seu conhecimento e consentimento.
              Também informamos por que estamos coletando e como será usado.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </Typography.Paragraph>
            <Typography.Paragraph>
              A Ymmunos não divulga informações pessoais identificáveis
              fornecidas por pelos Usuários a terceiros. Caso seja solicitado
              por uma ordem expedida por autoridade competente no cumprimento de
              suas atribuições legais, ou em caso de violações ou suspeita de
              violações desta Política de Privacidade, dos Termos de Uso ou da
              Lei, pode ser que haja a disponibilização das informações pessoais
              que estiverem armazenadas, revelando o mínimo necessário para
              atingir as finalidades exigidas.
            </Typography.Paragraph>
            <Typography.Title
              id='security'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Segurança
            </Typography.Title>
            <Typography.Paragraph>
              Temos um compromisso com a segurança dos dados de identificação
              pessoal e tomamos precauções razoáveis para manter essa proteção.
            </Typography.Paragraph>
            <Typography.Title
              id='user-register'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Website de terceiros
            </Typography.Title>
            <Typography.Paragraph>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
            </Typography.Paragraph>
            <Typography.Title
              id='exemption-
                responsibility'
              level={3}
              style={{ textAlign: 'center' }}
            >
              Alterações a esta Política de Privacidade
            </Typography.Title>
            <Typography.Paragraph>
              A Ymmunos reserva-se ao direito de, a qualquer momento e a seu
              exclusivo critério, modificar, alterar ou atualizar a presente
              Política de Privacidade. Caso isso aconteça, os usuários serão
              avisados.
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

export default PrivacyPolicy
