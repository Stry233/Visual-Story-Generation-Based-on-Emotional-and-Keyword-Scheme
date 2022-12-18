import {
    //Input,
    Typography,
    Row,
    Button,
    List,
    Modal,
    Image,
    Divider
    //Col
  } from 'antd';
  import React, {useState} from 'react';
  import { CopyOutlined, FileImageOutlined, FrownOutlined, RocketOutlined } from '@ant-design/icons';
  
  //const { TextArea } = Input;
  const { Title } = Typography;
  
  const GeneratedTextField = ({contexts, listdata, setEmotions, setContexts, setListData, copyGeneratedText}) => {
    
    const [loadingState, setLoadingState] = useState(false);
    const [open, setOpen] = useState(Array.from({length: listdata.length}, (v, i) => false));
    const [imageUrl, setImageUrl] = useState("");

    const generateImage = async (sentence) => {
      // send request
  
      try {
        const Url = new URL("http://129.161.106.27:5000/stablediffusion");
        Url.searchParams.append('sentence', sentence);
        console.log(Url)
        await fetch(Url)
        .then(data =>{
          setImageUrl(data.url)
        }) 
      } catch (err) {
        console.log(err.message); //can be console.error
      }
    }

    const generateEmo = (it) => {
      // send request
  
      try {
        const url = new URL("http://129.161.106.27:5000/roberta-large"); //129.161.106.27
        url.searchParams.append('sentence', it);
        fetch(url)
          .then(data => data.json())
          .then(data => {
          // The line below is a declaration of a array
            const plutchikEmotion = data.generatedEmo
            setEmotions([])
            setEmotions(plutchikEmotion)   
          })
          .catch(e => console.error(e));
        // set generatedText
        
      } catch (err) {
        console.log(err.message); //can be console.error
      }
  
    }

    const enterLoading = async (it, index) => {
      setLoadingState(true);
      await generateImage(it).then(() => {
        showModal(index)
        setLoadingState(false)
      })
    };

    const showModal = (index) => {
      const newOpen = open;
      newOpen[index] = true;
      setOpen(prev => newOpen);
    };
    
    const hideModal = (index) => {
      setOpen(Array.from({length: listdata.length}, (v, i) => false));
    };

    return (
      <>
        <Row>
          <Title level={2}>Generated text</Title>
          <Button onClick={() => copyGeneratedText()} type="default" icon={<CopyOutlined />} size="small" />
        </Row>
        <List
          size="large"
          header={<div>Start</div>}
          footer={<div>End</div>}
          bordered
          dataSource={listdata}
          renderItem={(item, index) => (
            <List.Item>
              <>
                <Row>
                  {item}
                </Row>
                <Row>
                  <Button icon={<FileImageOutlined />} type="primary" size="small" loading={loadingState} onClick={async () => await enterLoading(item, index)} />
                  <Modal
                    open={open[index]}
                    onOk={() => hideModal(index)}
                    onCancel={() => hideModal(index)}
                    okText="OK"
                    cancelText="Cancel"
                  >
                    <Row justify="center">
                      <Divider>{item}</Divider>
                      <Image
                        width={200}
                        src = {imageUrl}
                      />
                    </Row>
                  </Modal>
                  <Button onClick={() => generateEmo(item)} icon={<RocketOutlined />} type="default" size="small" />
                  <Button onClick={() => setContexts(contexts+' '+item)} icon={<CopyOutlined />} type="default" size="small" />
                  <Button onClick={() => setListData((current) => current.filter((it) => it !== item))} icon={<FrownOutlined />} type="default" size="small" danger/>
                </Row>
              </>
            </List.Item>
          )}
        />
      </>
    )
  };
  
  export default GeneratedTextField;