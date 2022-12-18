import {
    Input,
    Typography,
    Checkbox,
    Button,
    Row,
    Popover,
    Space,
    List
  } from 'antd';
  import React, {useState} from 'react';
  import { QuestionCircleOutlined, AimOutlined } from '@ant-design/icons';
  
  const { TextArea } = Input;
  const { Title } = Typography;
  const hovercontent = (
    <div>
      <p>Input format: kw1, kw2, kw3, ...</p>
    </div>
  );
  const options = [
    { label: 'joy', value: 'joy' },
    { label: 'trust', value: 'trust' },
    { label: 'fear', value: 'fear' },
    { label: 'surprise', value: 'surprise' },
    { label: 'sadness', value: 'sadness' },
    { label: 'disgust', value: 'disgust' },
    { label: 'anger', value: 'anger' },
    { label: 'anticipation', value: 'anticipation' },
  ];
  
  const InputBox = ({ contexts, emotions, keywords, setContexts, setEmotions, setKeywords, resetAll, generate }) => {
    const [open, setOpen] = useState(false);
    const [listdata1, setListdata1] = useState([]);

    const handleOpenChange = (newOpen) => {
      try {
        const url = new URL("http://###.###.###.##:5000/sngparser"); //###.###.###.##
        url.searchParams.append('sentence', contexts);
        fetch(url)
          .then(data => data.json())
          .then(data => {
          // The line below is a declaration of a array
            const kw = data.generatedKeywords
            setListdata1(kw)  
          })
          .catch(e => console.error(e));
        // set generatedText
      } catch (err) {
        console.log(err.message); //can be console.error
      }
      setOpen(newOpen);
    };

    const printEmo = (checkedValues) =>{
      setEmotions(checkedValues)
    }

    const onClickEach = (it) => {
      // const kw = keywords
      // const tmp = "; "
      // if(keywords.length !== 0)
      // {
      //   setKeywords(kw.concat(tmp));
      // }
      setKeywords(keywords.concat(it))
    }

    return (
      <>
        <Row>
          <Title level={2}>Contexts</Title>
          <Popover
            content={
              <List
                size="large"
                bordered
                dataSource={listdata1}
                renderItem={(item) => 
                <List.Item>
                  {item}
                  <Button onClick={() => onClickEach(item)} type="default" icon={<AimOutlined />} size="small"/>
                </List.Item>}
              />
            }
            title="NER keyword suggestions"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button type="default" icon={<AimOutlined />}/>
          </Popover>
        </Row>
        <TextArea rows={4} value={contexts} onChange={(e) => setContexts(e.target.value)} maxLength={255} span={6} style={{ resize: 'none' }} bordered showCount />
        <br />
        <br />
        <br />
        <Title level={2}>Plutchik's emotion</Title>
        <Checkbox.Group value={emotions} options={options} onChange={printEmo} />
        <br />
        <br />
        <br />
        <Row>
          <Title level={2}>NER keywords</Title>
          <Popover content={hovercontent} title="Format your input" trigger="hover">
            <QuestionCircleOutlined />
          </Popover>
        </Row>
        <TextArea rows={4} value={keywords} onChange={(e) => setKeywords(e.target.value)} maxLength={255} style={{ resize: 'none' }} span={6} showCount />
        <br />
        <br />
        <Space align='start' direction='horizontal'>
          <Button onClick={() => resetAll()} type="primary" size="large" danger>Reset</Button>
          <Button onClick={() => generate()} type="primary" size="large">Generate!</Button>
        </Space>
      </>
    )
  };
  
  export default InputBox;