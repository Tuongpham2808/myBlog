import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  // const [category, setCategory] = useState("");
  // const [user, setUser] = useState("");
  //lấy ra categories
  // useEffect(() => {
  //   async function fetch() {
  //     const docRef = doc(db, "categories", data.categoryId);
  //     const docSnap = await getDoc(docRef);
  //     setCategory(docSnap.data());
  //   }
  //   fetch();
  // }, [data.categoryId]);
  //lấy ra author
  // useEffect(() => {
  //   async function fetchUser() {
  //     if (data.userId) {
  //       const docRef = doc(db, "users", data.userId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.data()) {
  //         setUser(docSnap.data());
  //       }
  //     }
  //   }
  //   fetchUser();
  // }, [data.userId]);
  if (!data || !data.id) return null;
  const { category, user } = data;
  // console.log(data);
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} alt={data.image_name}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            authorName={user?.username}
            to={slugify(user?.username || "", { lower: true })}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle size="big" to={data.slug}>
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
