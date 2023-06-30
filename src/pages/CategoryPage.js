import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [cate, setCate] = useState();
  const { slug } = useParams();
  //Lấy ra danh sách bài viết thuộc danh mục
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [slug]);
  //Lấy ra tên của danh mục
  useEffect(() => {
    async function fetchDataCate() {
      const docRef = query(
        collection(db, "categories"),
        where("slug", "==", slug)
      );
      const DataCate = await getDocs(docRef);
      setCate(DataCate.docs[0].data());
    }
    fetchDataCate();
  }, [slug]);

  if (posts.length <= 0) return null;

  return (
    <Layout>
      <div className="container">
        <Heading>Danh mục {cate?.name}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
