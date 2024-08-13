import React, { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const label = 'block mb-2 text-lg text-white'
const input = 'ring-2 ring-gray-300 w-5/6 rounded p-1 '
const button = 'mt-4 bg-blue-100 text-black hover:bg-blue-800 hover:text-white font-bold py-2 px-4 rounded'

const customStyles = {
    content: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(45deg, rgb(43 90 192), rgb(98 154 255))',
        border: 'none',
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        height: 'auto'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const errorsStyle = {
    errorText: {
        color: 'rgb(255 255 255)',
        fontWeight: 'bold',
        textShadow: 'rgba(0, 0, 0, 0.5) 1px 1px 2px',
        background: 'linear-gradient(45deg, #ff0000, #7ccdff54)',
        padding: '5px',
        borderRadius: '5px'
    },
}

const SignupForm = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(true);

    function openModal() {
        setIsOpen(true);
    }
    const hanadleClickRL = () => {
        trigger();
    }
    const switchForm = () => {
        setIsRegister(!isRegister);
        trigger();
    };
    function closeModal() {
        setIsOpen(false);
    }

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            username: isRegister ? Yup.string().required('*') : Yup.string(),
            email: Yup.string().email('Неверный формат email').required('*'),
            password: Yup.string().required('*'),
            confirmPassword: isRegister
                ? Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
                    .required('*')
                : Yup.string(),
        });
    }, [isRegister]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
        resolver: yupResolver(validationSchema),
    });
    useEffect(() => {
        // Сброс формы и обновление валидации при изменении isRegister
        reset();
    }, [isRegister, reset]);

    const onSubmit = (data) => {
        fetch('http://localhost:8080/RegLog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => data)
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <button className={button} onClick={openModal}>Авторизация</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Authentication Modal"
                className="ReactModal__Content"
            >
                <button onClick={closeModal} className={button + 'text-xl p-2 w-1/6 border-none rounded-full cursor-pointer'}>
                    X
                </button>
                <h2 className='text-white text-center text-2xl mb-5'>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4 flex flex-col'>
                        {isRegister && (
                            <div className='space-y-4'>
                                {
                                    errors.username ? (
                                        <div className='text-lg' style={errorsStyle.errorText}>{errors.username.message + " Введите имя пользователя"}</div>
                                    ) : <label className={label} htmlFor="username">Никнейм</label>
                                }
                                <input className={input} {...register('username')} />
                            </div>
                        )}
                        <div className='space-y-4'>
                            {
                                errors.email ? (
                                    <div className='text-lg' style={errorsStyle.errorText}>{errors.email.message + " Введите @email"}</div>
                                ) : <label className={label} htmlFor="email">Email</label>
                            }
                            <input className={input} {...register('email')} type="email" />
                        </div>
                        <div className='space-y-4'>
                            {
                                errors.password ? (
                                    <div className='text-lg' style={errorsStyle.errorText}>{errors.password.message + " Введите пароль"}</div>
                                ) : <label className={label} htmlFor="password">Пароль</label>
                            }
                            <input className={input} {...register('password')} type="password" />
                        </div>
                        {isRegister && (
                            <div className='space-y-4'>
                                {
                                    errors.confirmPassword ? (
                                        <div className='text-lg' style={errorsStyle.errorText}>{errors.confirmPassword.message + " Введите пароль повторно"}</div>
                                    ) : <label className={label} htmlFor="confirmPassword">Подтвердить пароль</label>
                                }
                                <input className={input} {...register('confirmPassword')} type="password" />
                            </div>
                        )}
                    </div>
                    <button className={button + ' w-full'} id={isRegister ? 'reg' : 'log'} type='submit' onClick={hanadleClickRL}>
                        {isRegister ? 'Регистрация' : 'Авторизация'}
                    </button>
                    <button className={button + ' w-full'} onClick={switchForm}>
                        {isRegister ? 'Авторизация' : 'Регистрация'}
                    </button>
                </form>
            </Modal>
        </div>

    );
};

export default SignupForm;
