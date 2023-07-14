import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'
import api from '../../../services/api'
import { getProfile, setProfile } from '../../../utils/authentication'

export const textMonths: any = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}

const ProfileForm: FC = () => {
  const [form] = Form.useForm()

  const profile = getProfile()

  // const [ufs, setUfs] = useState<any[]>([])
  // const [stateId, setStateId] = useState('24')
  // const [cities, setCities] = useState<any[]>([])
  // const [city, setCity] = useState(profile.city)
  const [loading, setLoading] = useState(false)

  // const [day, setDay] = useState(profile.birth.split('T')[0].split('-')[2])
  // const [month, setMonth] = useState(
  //   textMonths[Number(profile.birth.split('T')[0].split('-')[1])]
  // )

  // const [year, setYear] = useState(profile.birth.split('T')[0].split('-')[0])

  // useEffect(() => {
  //   fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(
  //     response => {
  //       response.json().then(ufs => setUfs(ufs))
  //     }
  //   )
  // }, [])

  // useEffect(() => {
  //   fetch(
  //     `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
  //   ).then(response => {
  //     response.json().then(cities => setCities(cities))
  //   })
  // }, [stateId])

  const onFinish = (values: any) => {
    setLoading(true)
    // const stateSelected = ufs.filter(uf => uf.id === Number(stateId))[0]
    // const stateFormated = `${stateSelected.nome} - ${stateSelected.sigla}`

    api
      .put(`/profiles/${profile.id}`, {
        ...values,
        // birth: `${year}-${month}-${day}`,
        // state: stateFormated,
        // city,
      })
      .then(() => {
        setProfile({
          ...profile,
          ...values,
          // birth: `${year}-${month}-${day}`,
          // state: stateFormated,
          // city,
        })
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Form
      name='login-form'
      className='login-form'
      layout='vertical'
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={err => console.log('erro no finish', err)}
      requiredMark={false}
      scrollToFirstError
    >
      <Form.Item
        label='Nome Completo'
        name='name'
        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
        initialValue={profile.name}
      >
        <Input placeholder='Ex.: Carlos Augusto' size='large' />
      </Form.Item>
      {/* <Form.Item
        label='Cpf'
        name='cpf'
        rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
      >
        <Input placeholder='' size='large' />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Por favor, insira o email!' }]}
        initialValue={profile.email}
      >
        <Input placeholder='Ex.:  Carlos.augusto@email.com' size='large' />
      </Form.Item> */}

      {/* <Form.Item name='birth' label='Data de Nascimento'>
        <Space>
          <InputNumber
            placeholder='Dia'
            min={1}
            max={31}
            value={day}
            onChange={value => {
              setDay(value)
            }}
          />
          <Select
            placeholder='Mês'
            style={{ width: '100px' }}
            value={month}
            onChange={value => {
              setMonth(value)
            }}
          >
            {months.map(item => (
              <Select.Option value={item.value}>{item.name}</Select.Option>
            ))}
          </Select>
          <InputNumber
            placeholder='Ano'
            min={1910}
            max={moment().year()}
            value={year}
            onChange={value => {
              setYear(value)
            }}
          />
        </Space>
      </Form.Item> */}

      {/* <Form.Item
        name='gender'
        label='Sexo'
        rules={[
          {
            required: true,
            message: 'Por favor, informe seu sexo!',
            whitespace: true,
          },
        ]}
        initialValue={profile.gender === 'male' ? 'Masculino' : 'Feminino'}
      >
        <Input disabled={true} />
      </Form.Item> */}

      {/* <Form.Item
        name='state'
        label='Estado'
        rules={[{ required: true, message: 'Por favor, selecione um estado!' }]}
        initialValue={profile.state}
      >
        <Select
          placeholder='Selecione um estado'
          onChange={value => {
            setStateId(`${value}`)
          }}
          allowClear
        >
          {ufs.map(uf => (
            <Select.Option
              key={uf.id}
              value={uf.id}
            >{`${uf.nome} - ${uf.sigla}`}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='city'
        label='Cidade'
        rules={[
          { required: true, message: 'Por favor, selecione uma cidade!' },
        ]}
        initialValue={profile.city}
      >
        <Select
          placeholder='Selecione uma cidade'
          value={city}
          onChange={value => {
            setCity(`${value}`)
          }}
          allowClear
        >
          {cities.map(city => (
            <Select.Option key={city.id} value={city.nome}>
              {city.nome}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          size='large'
          loading={loading}
          disabled
          style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
        >
          Salvar Alterações
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProfileForm
