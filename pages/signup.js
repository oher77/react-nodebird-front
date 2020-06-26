import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color: red;
`

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password],
    );

    const [terms, setTerms] = useState('');
    const [termsError, setTermsError] = useState(false);
    const onChangeTerms = useCallback((e) => {
        setTerms(e.target.checked);
        console.log(e.target.checked);
        setTermsError(false);
    }, [],
    );

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!terms) {
            return setTermsError(true);
        }
        console.log(id, nickname, password);
    }, [terms, password, passwordCheck],
    );
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <Input name="user-password"  value={password} required onChange={onChangePassword}  type= "password"/>
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <Input name="user-password-check" value={passwordCheck} required onChange={onChangePasswordCheck} type= "password"/>
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-terms" onChange={onChangeTerms} checked={terms}>
                        사이좋은 친구가 되는 것에 동의합니다.
                    </Checkbox>
                    {termsError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>
                <div>
                    <Button type="primary" htmlType="submit">제출하기</Button>
                </div>

            </Form>
        </AppLayout>
    )
}

export default Signup;
