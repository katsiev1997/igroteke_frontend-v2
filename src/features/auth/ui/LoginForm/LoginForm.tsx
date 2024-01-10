import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link } from 'react-router-dom';
import cls from './LoginForm.module.scss';
import React from 'react';
import { customerData } from '../../model/types/customer';
import { adminData } from '../../model/types/admin';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { customerLogin } from '../..';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { useSelector } from 'react-redux';
import { Loading } from 'src/shared/ui/Loading/Loading';

export const LoginForm = () => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const error = useSelector((state: StateSchema) => state.auth.error);
  const loading = useSelector((state: StateSchema) => state.auth.loading);
  const dispatch = useAppDispatch();
  const onChange = (e: CheckboxChangeEvent) => {
    setIsAdmin(e.target.checked);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        fontSize: '15px',
        marginTop: '22vh',
      },
    });
  };
  const onSubmit = async (values: customerData | adminData) => {
    const res = await dispatch(customerLogin(values));
    if (res.meta.requestStatus === 'fulfilled') {
      successMessage('Вы авторизовались!')
      setTimeout(() => {
        window.location.href = '/'
      },1000)
    }
  };
  console.log(isAdmin);
  return (
    <div className={cls.form}>
      {loading && <Loading />}
      {contextHolder}
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name='phone'
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите номер телефона!',
            },
          ]}
        >
          <Input
            prefix={
              <div>
                <PhoneOutlined className='site-form-item-icon' /> +7
              </div>
            }
            size='large'
            className='input'
            placeholder='Номер телефона...'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            size='large'
            placeholder='Пароль...'
            className='input'
          />
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={onChange} style={{ color: '#fff' }}>
            Администратор
          </Checkbox>
        </Form.Item>
        {error && (
          <Form.Item
            style={{
              color: 'red',
              backgroundColor: '#fff',
              textAlign: 'center',
              borderRadius: '5px',
            }}
          >
            <p>{error}</p>
          </Form.Item>
        )}
        <Form.Item>
          <span style={{ color: '#fff' }}> У вас нет аккаунта?  </span>{' '}
          <Link style={{ color: '#09f' }} to='/signup'>
            Зарегистрироваться сейчас!
          </Link>
        </Form.Item>
        <Form.Item>
        <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
