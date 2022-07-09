import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { instance } from "../shared/axios";

const Like = (props,{ likeCount,boardId }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [like_count, setLike_count] = useState(likeCount);
  const [like, setLike] = useState();

  const Postdata = useSelector((state) => state.post.postList.data);
  // console.log(Postdata[0].boardId,"likecount")

  boardId = (props.forLikeId)
  console.log(boardId,"IDDDDD")

  useEffect(() => {
    async function likeLoad(boardId) {
      await instance.get(`/api/board/${boardId}`)
      .then((response) => {
        console.log(response.data,"Like?")
        setLike(response.data);
      });
      setIsloaded(true);
    }
    likeLoad();
  }, []);

  // 좋아요 추가
  const addLike = async (boardId) => {
    await instance.post(`/board/${boardId}`);
    setLike_count(likeCount + 1);
    setLike(false)
  };
  // 좋아요 취소
  const deleteLike = async (boardId) => {
    await instance.post(`/board/${boardId}`);
    setLike_count(likeCount - 1);
    setLike(true)
  };

  return (
    <>
        <LikeCount>
             <div>
                <span>{likeCount}</span>
              </div>
          {like ? (
            <span onClick={addLike}>💚</span>
          ) : (
            <span onClick={deleteLike}>🤍</span>
          )}
        </LikeCount>
    </>
  );
};

const LikeCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Like;