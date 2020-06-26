import React, { useCallback, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post);
    const [text, onChangeText] = useInput('');
    const dispatch = useDispatch();
    const imageInput = useRef();
    const onSubmit = useCallback(() => {
        dispatch(addPost);
        postInput.value = ''
    }, []);
    const onClickImageUpload = useCallback(() => {
        console.log(imageInput);
        imageInput.current.click();
    }, [imageInput.current]);
    return (
        <Form style={{ margin: '10px 0 20px' }} encType="mulipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                id="postInput"
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <input type="file" multiple hidden ref={imageInput} />
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
            <Button type="primary" style={{ float: 'right' }} htmlType="submit" >짹짹</Button>
            <div>
                {imagePaths.map((v) =>
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                )}
            </div>
        </Form>
    )
}

export default PostForm;