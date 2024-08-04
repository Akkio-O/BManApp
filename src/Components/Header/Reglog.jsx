import React, { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const label = 'block mb-2 text-lg'
const input = 'ring-2 ring-gray-300 w-5/6 rounded p-1 '
const button = 'mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

const customStyles = {
    content: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
        borderRadius: '10px',
        padding: '20px',
        width: '400px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
};

const SignupForm = () => {
    const [modalIsOpen, setIsOpen] = useState(false); // false закрытое окно, true открытое окно
    const [isRegister, setIsRegister] = useState(true); // true для регистрации, false для авторизации

    function openModal() {
        setIsOpen(true);
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
                // onAfterOpen={afterOpenModal} действие вызывается после открытия модального окна
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Authentication Modal"
                className="ReactModal__Content"
            >
                <button onClick={closeModal} className={button + 'text-xl p-2 w-1/6 border-none rounded-full cursor-pointer'}>
                    X
                </button>
                <h2 className='color-2c3e50 text-center text-2xl mb-5'>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4 flex flex-col'>
                        {isRegister && (
                            <div className='space-y-4'>
                                <label className={label} htmlFor="username">Никнейм</label>
                                <input className={input} {...register('username')} />
                                {errors.username && <div className='text-red-600'>{errors.username.message}</div>}
                            </div>
                        )}
                        <div className='space-y-4'>
                            <label className={label} htmlFor="email">Email</label>
                            <input className={input} {...register('email')} type="email" />
                            {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
                        </div>
                        <div className='space-y-4'>
                            <label className={label} htmlFor="password">Пароль</label>
                            <input className={input} {...register('password')} type="password" />
                            {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                        </div>
                        {isRegister && (
                            <div className='space-y-4'>
                                <label className={label} htmlFor="confirmPassword">Подтвердить пароль</label>
                                <input className={input} {...register('confirmPassword')} type="password" />
                                {errors.confirmPassword && <div className='text-red-600'>{errors.confirmPassword.message}</div>}
                            </div>
                        )}
                    </div>
                    <button className={button + ' w-full'} id={isRegister ? 'reg' : 'log'} type='submit'>
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
