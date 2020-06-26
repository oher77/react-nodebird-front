import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
    HeartFilled
} from '@ant-design/icons';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
const PostCard = ({ post }) => {
    const { me } = useSelector((state => state.user));
    //옵셔널 체이닝 Optional Chaning 연산자
    const id = me?.id; //me && me.id
    //이렇게 한 줄로 써줄 수도 있다.
    //const id = useSelector((state)=> state.user.me?.id)

    const [liked, setLiked] = useState(false);
    const [commentForOpened, setCommentForOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentForOpened((prev) => !prev);
    }, []);
    return (
        <div style={{ marginBottom: 16 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartFilled style={{ color: 'red' }} key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {/* 등록자가 내 아이디이면 수정/삭제 버튼 : 다른사람 아이디면 신고버튼 */}
                            {id && post.User.id === id
                                ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger">삭제</Button>
                                    </>
                                ) :
                                <Button>신고</Button>}
                        </Button.Group>
                    )} >
                        <EllipsisOutlined key="" />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}/* User.nickname 의 첫글자 */
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentForOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        //item이 각각의 Comment 데이터
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

PostCard.propTypes = {
    //object는 shape로 각각의 타입을 구체적으로 정할수 있다
    post: PropTypes.shape({
        id: PropTypes.numver,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;
