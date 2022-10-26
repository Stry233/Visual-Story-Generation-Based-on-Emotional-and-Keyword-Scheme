import './App.css';
import { useState } from 'react';
import {
  Row,
  Col,
  Layout
} from 'antd';
import InputBox from './components/InputBox'
import GeneratedTextField from './components/GeneratedTextField'
//import { LoadingOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;
function App() {
  const [contexts, setContexts] = useState("");
  const [emotions, setEmotions] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [listdata, setListData] = useState([]);

  const generate = () => {
    // send request

    try {
      const url = new URL("http://35.239.173.52:5000/t5gen");
      url.searchParams.append('keywords', keywords);
      url.searchParams.append('contexts', contexts);
      url.searchParams.append('emotions', emotions);
      //const res = fetch(url).then(res => res.json());
      //const text = res.generatedText

      if(!listdata || !listdata.length){
        setListData(prev => [...prev, contexts]);
      }
      fetch(url)
        .then(data => data.json())
        .then(data => {
        // The line below is a declaration of a array
          const text = data.generatedText
          setListData(prev => [...prev, text]);      
        })
        .catch(e => console.error(e));
      // set generatedText
      
    } catch (err) {
      console.log(err.message); //can be console.error
    }
  }

  const resetAll = () => {
    setContexts("");
    setEmotions([]);
    setKeywords("");
    setGeneratedText("");
    setListData([]);
  }

  const copyGeneratedText = () => {
    navigator.clipboard.writeText(generatedText);
  }

  return (
    <Layout style={{height:"100vh"}}>
      <Header>Header</Header>
      <Content>
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '75vh' }} gutter={[72, 20]}>
          <Col span={7}>
            <InputBox contexts={contexts} emotions={emotions} keywords={keywords} setContexts={setContexts} setEmotions={setEmotions} setKeywords={setKeywords} resetAll={resetAll} generate={generate} />
          </Col>
          <Col span={7}>
            <GeneratedTextField contexts={contexts} listdata={listdata} emotions={emotions} setEmotions={setEmotions} setContexts={setContexts} setListData={setListData} copyGeneratedText={copyGeneratedText}/>
          </Col>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >Visual Story Generation Based on Emotional and Keyword Scheme @2022 Created by Yuetian Chen, Ruohua Li, Bowen Shi, Peiru Liu, Mei Si</Footer>
    </Layout>
  );
}

export default App;