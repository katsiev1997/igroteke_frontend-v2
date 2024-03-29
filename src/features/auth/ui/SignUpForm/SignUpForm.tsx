import {
  IdcardOutlined,
  LockOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { Loading } from 'src/shared/ui/Loading/Loading';
import { adminSignup } from '../..';
import { adminData } from '../../model/types/auth';
import cls from './SignUpForm.module.scss';

export const SignUpForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = useSelector((state: StateSchema) => state.auth.error);
  const loading = useSelector((state: StateSchema) => state.auth.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '22vh',
      },
    });
  };
  const errorMessage = (text: string) => {
    messageApi.open({
      type: 'error',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '22vh',
      },
    });
  };
  const onSubmit = async (values: adminData) => {
    const res = await dispatch(adminSignup(values));
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      errorMessage('Пароли не совпадают!');
    }
    if (res.meta.requestStatus === 'fulfilled') {
      successMessage('Вы успешно зарегистрировались!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
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
  return (
    <div className={cls.form}>
      {contextHolder}
      {loading && <Loading />}
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
              message:
                'Пожалуйста введите свой номер телефона без восьмерки, 10 цифр! ',
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
            placeholder='Номер телефона...'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
            type='password'
            placeholder='Пароль...'
          />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          rules={[{ required: true, message: 'Пожалуйста, повторите пароль!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
            type='password'
            placeholder='Повторите пароль...'
          />
        </Form.Item>
          <Form.Item
            name='clubId'
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите ID клуба! ',
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className='site-form-item-icon' />}
              size='large'
              type='password'
              placeholder='ID club'
            />
          </Form.Item>
        <Form.Item style={{ color: '#fff' }}>
          У вас уже есть аккаунт?{' '}
          <Link style={{ color: '#09f' }} to='/login'>
            Войти сейчас!
          </Link>
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
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' size='large'>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
