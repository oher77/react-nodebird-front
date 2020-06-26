import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';


const UserProfile = () => {
    const dispatch= useDispatch();
    const onLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, []);

    return (
        <Card            
            // cover={
            //     <img
            //         alt="example"
            //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //     />
            // }
            actions={[
                <div key="twit">짹잭<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
                <div key="follower">팔로워<br/>0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>HU</Avatar>}
                title="HerUse"
                description="This is the description"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;
