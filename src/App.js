import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Select, Row, Button, Typography, Checkbox, Radio } from 'antd';
import React from 'react';
import 'antd/dist/antd.min.css';

const { Option } = Select;
const moment = require('moment')

let date = new Date();    //날짜 초기값 설정
let year = String(date.getFullYear());
let tmonth = date.getMonth();
tmonth += 1;
if(tmonth <= 9){   //두자리 수로 반환한다.
  tmonth = "0" + tmonth;
}
let fmonth = tmonth - 1
if(fmonth <= 9){   
  fmonth = "0" + fmonth;
}
let day = date.getDate();
day -= 1;
if (day <= 9){
  day = "0" + day;
}

const App = () => {
  const [form] = Form.useForm();
  
  const queryTemplete = {
    "startDate": "",
    "endDate": "",
    "timeUnit": "",
    "category": [
      {"name":"", "param": [""]},
      {"name":"", "param": [""]}
    ],
    "device": "",
    "gender": "",
    "ages": []
  
    }

  const getDay = (changeDate) => {  //날짜를 (yyyy-mm-dd형식)으로 만들기
    let datetemp = moment().subtract(1,'days').calendar().format("YYYYMMDD");
    const fielddate = form.getFieldsValue()
    fielddate.dateFromYear = datetemp.substring(0,4);
    fielddate.dateFromMonth = changeDate.substring(4,6);
    fielddate.dateFromDay = changeDate.substring(6,8);
    
     
  }

  const onChange = (timerange) => {   //라디오버튼 눌렀을 때 해당하는 날짜로 변경(1개월, 3개월, 1년)
    let dateset = moment().subtract(1,'days').calendar().format("YYYYMMDD")
    let fieldData = form.getFieldsValue()
    if(timerange = "1m")  
      dateset = dateset.moment().subtract(1,'months').calendar().format("YYYYMMDD")  
    else if(timerange = "3m")
      dateset= dateset.moment().subtract(3,'months').calendar().format("YYYYMMDD")
    else if(timerange = "1y")
      dateset = dateset.moment().subtract(1, 'years').calendar().format("YYYYMMDD") 
  }

  const selfChange = () => {      //날짜 직접 바꾸면 라디오버튼을 직접입력으로 변경 
    let rbutton = form.getFieldsValue()
    rbutton.daterange = "self"
    form.setFieldsValue(rbutton)
  }   

    const onClick = () => {     //조회하기 버튼 클릭하면 서버에 정보 전송하기
    // let fieldData = form.getFieldsValue()
    
    // queryTemplete.startDate = fieldData
    // queryTemplete.endDate =
    // queryTemplete.timeUnit = fieldData.timeUnit
    // queryTemplete.category.name = 
    // queryTemplete.category.param = 
    // queryTemplete.device = fieldData.device
    // queryTemplete.gender = fieldData.gender
    // queryTemplete.ages.push(fieldData.ages)
  }   

  
  return (
    <>
    <Form
      form={form}
    >
    <dir>  분야 통계 </dir>
    <br />
    <br />
    <Row>
    <Typography.Text strong style={{marginLeft:10}}> 분야 </Typography.Text>
    <Form.Item name="category">
    <Select defaultValue="패션의류" style={{width: 200, marginTop: 30, marginRight: 30}}>
      <Option value="패션의류">패션의류</Option>
      <Option value="패션잡화">패션잡화</Option>
      <Option value="화장품/미용">화장품/미용</Option>
      <Option value="디지털/가전">디지털/가전</Option>
      <Option value="가구/인테리어">가구/인테리어</Option>
      <Option value="출산/육아">출산/육아</Option>
      <Option value="식품">식품</Option>
      <Option value="스포츠/레저">스포츠/레저</Option>
      <Option value="생활/건강">생활/건강</Option>
      <Option value="여가/생활편의">여가/생활편의</Option>
      <Option value="면세점">면세점</Option>
      <Option value="도서">도서</Option>
    </Select>
    </Form.Item>
    </Row>
    
    <Row>
    <Typography.Text strong style={{marginLeft:10}}> 기간 </Typography.Text>
    <Form.Item name="timeUnit">
    <Select defaultValue="date" style={{width: 100, marginTop: 30, marginRight: 30}}>
      <Option value="date">일간</Option>
      <Option value="week">주간</Option>
      <Option value="month">월간</Option>
    </Select>
    </Form.Item> 

    <Form.Item name="daterange">
    <Radio.Group defaultValue="1m" buttonStyle="solid" style={{ marginTop: 30, marginRight: 30}}>
      <Radio.Button value="1m" onChange={()=>onChange("1m")}>1개월</Radio.Button>
      <Radio.Button value="3m" onChange={()=>onChange("3m")}>3개월</Radio.Button>
      <Radio.Button value="1y" onChange={()=>onChange("1y")}>1년</Radio.Button>
      <Radio.Button value="self" >직접입력</Radio.Button>
    </Radio.Group>
    </Form.Item>

    <Form.Item name = "dateFromYear">
    <Select defaultValue={year} style={{ marginTop: 30, width: 100 }} onChange={selfChange}>
      <Option value="2017">2017</Option>
      <Option value="2018">2018</Option>
      <Option value="2019">2019</Option>
      <Option value="2020">2020</Option>
      <Option value="2021">2021</Option>
      <Option value="2022">2022</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateFromMonth">
    <Select defaultValue={fmonth} style={{ marginTop: 30, width: 100 }} onChange={selfChange}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateFromDay">
    <Select defaultValue={day} style={{ marginTop: 30, marginRight: 10, width: 100 }} onChange={selfChange}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
      <Option value="13">13</Option>
      <Option value="14">14</Option>
      <Option value="15">15</Option>
      <Option value="16">16</Option>
      <Option value="17">17</Option>
      <Option value="18">18</Option>
      <Option value="19">19</Option>
      <Option value="20">20</Option>
      <Option value="21">21</Option>
      <Option value="22">22</Option>
      <Option value="23">23</Option>
      <Option value="24">24</Option>
      <Option value="25">25</Option>
      <Option value="26">26</Option>
      <Option value="27">27</Option>
      <Option value="28">28</Option>
      <Option value="29">29</Option>
      <Option value="30">30</Option>
      <Option value="31">31</Option>
    </Select>
    </Form.Item>
    <Typography.Text style={{ marginTop: 30}}>  ~  </Typography.Text>
    <Form.Item name = "dateToYear">
    <Select defaultValue={year} style={{ marginTop: 30, marginLeft:10, width: 100 }} onChange={selfChange}>
      <Option value="2017">2017</Option>
      <Option value="2018">2018</Option>
      <Option value="2019">2019</Option>
      <Option value="2020">2020</Option>
      <Option value="2021">2021</Option>
      <Option value="2022">2022</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateToMonth">
    <Select defaultValue={tmonth} style={{ marginTop: 30, width: 100 }} onChange={selfChange}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
    </Select>
    </Form.Item>
    <Form.Item name = "dateToDay">
    <Select defaultValue={day} style={{ marginTop: 30, width: 100 }} onChange={selfChange}>
      <Option value="01">01</Option>
      <Option value="02">02</Option>
      <Option value="03">03</Option>
      <Option value="04">04</Option>
      <Option value="05">05</Option>
      <Option value="06">06</Option>
      <Option value="07">07</Option>
      <Option value="08">08</Option>
      <Option value="09">09</Option>
      <Option value="10">10</Option>
      <Option value="11">11</Option>
      <Option value="12">12</Option>
      <Option value="13">13</Option>
      <Option value="14">14</Option>
      <Option value="15">15</Option>
      <Option value="16">16</Option>
      <Option value="17">17</Option>
      <Option value="18">18</Option>
      <Option value="19">19</Option>
      <Option value="20">20</Option>
      <Option value="21">21</Option>
      <Option value="22">22</Option>
      <Option value="23">23</Option>
      <Option value="24">24</Option>
      <Option value="25">25</Option>
      <Option value="26">26</Option>
      <Option value="27">27</Option>
      <Option value="28">28</Option>
      <Option value="29">29</Option>
      <Option value="30">30</Option>
      <Option value="31">31</Option>
    </Select>
    </Form.Item>
    </Row>
    
    <Row>
      <Typography.Text strong style={{marginLeft:10}}>기기별</Typography.Text>
        <Form.Item name="device"> 
          <Checkbox.Group style={{width: '100%', marginLeft: 10}}>
            <Checkbox value="">전체</Checkbox>
            <Checkbox value="pc">PC</Checkbox>
            <Checkbox value="mo">모바일</Checkbox>
          </Checkbox.Group> 
        </Form.Item>
        <Typography.Text style={{marginLeft:15, marginRight: 15}}>|</Typography.Text>
      <Typography.Text strong>성별</Typography.Text>
        <Form.Item name="gender"> 
          <Checkbox.Group style={{width: '100%', marginLeft: 10}}>
            <Checkbox value="">전체</Checkbox>
            <Checkbox value="f">여성</Checkbox>
            <Checkbox value="m">남성</Checkbox>
          </Checkbox.Group> 
        </Form.Item>
        <Typography.Text style={{marginLeft:15, marginRight: 15}}>|</Typography.Text>
      <Typography.Text strong>연령</Typography.Text>
        <Form.Item name="ages"> 
          <Checkbox.Group style={{width: '100%', marginLeft: 10}}>
            <Checkbox value="">전체</Checkbox>
            <Checkbox value="10">10대</Checkbox>
            <Checkbox value="20">20대</Checkbox>
            <Checkbox value="30">30대</Checkbox>
            <Checkbox value="40">40대</Checkbox>
            <Checkbox value="50">50대</Checkbox>
            <Checkbox value="60">60대 이상</Checkbox>
          </Checkbox.Group> 
        </Form.Item>
    </Row>
    <br />
    <br />
    <Button type="primary" icon={<SearchOutlined />} style={{marginLeft: 600}} onClick = {onClick}>
       조회하기
    </Button>
   
    <br/>

    </Form> 
    </>
  );
}

export default App;
