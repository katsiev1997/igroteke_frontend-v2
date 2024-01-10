import {
  CheckCircleOutlined,
  FieldNumberOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import cls from './CreateClubPage.module.scss';
import { $api } from 'src/shared/api';

interface IValues {
  phone: string;
  name: string;
  address: string;
  roomsNumber: string;
  code: string;
}

const CreateClubPage: React.FC = () => {
  const [disable, setDisable] = React.useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '20vh',
      },
    });
  };
  const errorMessage = (text: string) => {
    messageApi.open({
      type: 'error',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '20vh',
      },
    });
  };
  const fetchCreateClub = (values: IValues) => {
    const { phone, name, address, roomsNumber, code } = values;
    $api
      .post('/create_club', {
        phone,
        name,
        address,
        roomsNumber,
        code,
      })
      .then((res) => {
        successMessage(res.data.message);
        console.log(res.data.clubId);
      })
      .catch((error) => errorMessage(error.response.data.message));
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setDisable(e.target.checked);
  };
  return (
    <div>
      {contextHolder}
      <h2>Create Club</h2>
      <div className={cls.form}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={fetchCreateClub}
        >
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message:
                  'Пожалуйста введите свой номер телефона без восьмерки! ',
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className='site-form-item-icon' />}
              placeholder='Номер телефона'
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите название клуба! ',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              size='large'
              placeholder='Название клуба'
            />
          </Form.Item>
          <Form.Item
            name='address'
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите адрес клуба: город, улицу, дом! ',
              },
            ]}
          >
            <Input
              prefix={<HomeOutlined className='site-form-item-icon' />}
              size='large'
              placeholder='Адрес'
            />
          </Form.Item>
          <Form.Item
            name='roomsNumber'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите количество мест! ',
              },
            ]}
          >
            <Input
              prefix={<FieldNumberOutlined className='site-form-item-icon' />}
              size='large'
              placeholder='Количество мест'
            />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Введите код!' }]}
          >
            <Input
              prefix={<CheckCircleOutlined className='site-form-item-icon' />}
              size='large'
              placeholder='Проверочный код'
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onChange} style={{ color: '#fff', fontSize: '12px' }}>
              Я подтверждаю, что все поля заполнены верно.
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              disabled={!disable}
              type='primary'
              htmlType='submit'
              size='large'
            >
              Зарегистрировать клуб
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateClubPage