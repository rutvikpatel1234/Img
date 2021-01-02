import React, {useState, useEffect} from 'react'
import { Heading } from './Components/Heading';
import { Loader } from './Components/Loader';
import{ ImgList } from './Components/ImgList';
import{MoreImg} from './Components/MoreImg';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Tabs from './Components/Tabs';
import "./App.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;
const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

export const App = () => {
  const [images, setImage] = useState([]);
  useEffect(() =>{
    fetchImages();
    fetchImage();
  },[])
  const fetchImages = (count = 10) =>{
    const apiRoot = "https://api.unsplash.com";
    const accesskey = process.env.REACT_APP_ACCESSKEY;  

    axios 
      .get(`${apiRoot}/photos/random?client_id=${accesskey}&count=${count}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })
  }
  const fetchImage = (count = 10) =>{
    const apiRoot = "https://api.unsplash.com";
    const accesskey = process.env.REACT_APP_ACCESSKEY;  

    axios 
      .get(`${apiRoot}/photos/cars?client_id=${accesskey}&count=${count}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })
  }
  //  function TabChange(){
  //    window.location.reload();
  //  }
  return (
   
    <div>
      
      <Heading />
      <GlobalStyle />
      <Tabs>
        <div label="Movie">
        <InfiniteScroll 
      dataLength={images.length}
      next={fetchImage}
      hasMore={true}
      loader={<Loader />}
      >
        <WrapperImages>
          {images.map(image =>(
            <MoreImg url={image.urls.thumb} key={image.id} />
          ))}
        </WrapperImages>
      </InfiniteScroll>
        </div>

        <div label="Music">
        <InfiniteScroll 
      dataLength={images.length}
      next={fetchImages}
      hasMore={true}
      loader={<Loader />}
      >
        <WrapperImages>
          {images.map(image =>(
            <ImgList url={image.urls.thumb} key={image.id} />
          ))}
        </WrapperImages>
      </InfiniteScroll>
        </div>
      </Tabs>
      
    </div>
      
    
  );
}
export default App