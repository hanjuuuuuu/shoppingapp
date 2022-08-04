import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Select, Row, Button, Typography, Checkbox, Radio } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
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

const options = ['패션의류', '패션잡화', '화장품/미용', '디지털/가전', '가구/인테리어', '출산/육아', '식품', '스포츠/레저', '생활/건강', '여가/생활편의', '면세점', '도서'];

const subOptions = {
  '패션의류':['여성의류', '여성언더웨어', '남성의류', '남성언더웨어'], '패션잡화':['여성신발','남성신발','신발용품','여성가방','남성가방','여행용가방','지갑','벨트','모자','장갑'],
  '화장품/미용':['클렌징', '마스크','향수'], '디지털/가전':['PC', '모니터'], '가구/인테리어':['침실가구','거실가수','수납가구'], '출산/육아':['분유','기저귀','이유식'],
  '식품':['반찬','과자','음료'], '스포츠/레저':['자전거', '헬스', '낚시'], '생활/건강':['자동차용품','수집품'], '여가/생활편의':['원데이클래스','국내여행'],
  '면세점':['화장품','향수','시계', '주얼리'], '도서':['소설','시/에세이','경제/경영', '인문']
}

const App = () => {
  const [form] = Form.useForm();

  const[menu, setMenu] = useState(subOptions[options[0]]);
  const[secondMenu, setSecondMenu] = useState(subOptions[options[0]][0]);

  const handleOptionChange = (value) => {
    setMenu(subOptions[value]);
    setSecondMenu(subOptions[value][0]);
  }

  const onSecondMenuChange = (value) => {
    setSecondMenu(value);
  }
  
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

  const getDay = (changeDate) => {  //문자열 자르기를 통해 날짜 형식 맞추기
    let datetemp = moment().subtract(1,'days').format("YYYYMMDD");
    const fielddate = form.getFieldsValue()
    fielddate.dateFromYear = changeDate.substring(0,4);
    fielddate.dateFromMonth = changeDate.substring(4,6);
    fielddate.dateFromDay = changeDate.substring(6,8);

    fielddate.dateToYear = datetemp.substring(0,4);
    fielddate.dateToMonth = datetemp.substring(4,6);
    fielddate.dateToDay = datetemp.substring(6,8);

    return fielddate
  }

  const onChange = (timerange) => {   //라디오버튼 눌렀을 때 해당하는 날짜범위로 변경(1개월, 3개월, 1년)
    let dateset = moment().subtract(1, 'days').format("YYYYMMDD")

    if(timerange == "1m") 
      dateset = moment(dateset).subtract(1, 'months').format("YYYYMMDD")  
    else if(timerange == "3m")
      dateset= moment(dateset).subtract(3, 'months').format("YYYYMMDD")
    else if(timerange == "1y")
      dateset = moment(dateset).subtract(1, 'years').format("YYYYMMDD") 

    let finalDate = getDay(dateset)
    form.setFieldsValue(finalDate)
  }

  const selfChange = () => {      //날짜 직접 바꾸면 라디오버튼을 직접입력으로 변경 
    let sbutton = form.getFieldsValue()
    sbutton.daterange = "self"
    form.setFieldsValue(sbutton)
  }   

  // const categoryChange = (category2) => {    //분야별 분야에 맞는 2분류로 변경
  //   let categoryset = form.getFieldsValue()
  //   if(category2 == "패션의류"){
  //       var subOption = subOptions.a
  //       categoryset.category2 = subOption
  //       form.setFieldsValue(categoryset)
  //   }
  //   else if(category2 == "패션잡화"){
  //       subOption = subOptions.b
  //       categoryset.category2 = subOption
  //       form.setFieldsValue(categoryset)
  //       console.log(categoryset)
  //   }
  //   else if(category2 == "화장품/미용"){
  //       subOption = subOptions.c
  //       categoryset.category2 = subOption
  //       form.setFieldsValue(categoryset)
  //   }
  //   else if(category2 == "디지털/가전")
  //       subOption = subOptions.d
        
  //   else if(category2 == "가구/인테리어")
  //       subOption = subOptions.e
        
  //   else if(category2 == "출산/육아")
  //       subOption = subOptions.f
        
  //   else if(category2 == "식품")
  //       subOption = subOptions.g
        
  //   else if(category2 == "스포츠/레저")
  //       subOption = subOptions.h
        
  //   else if(category2 == "생활/건강")
  //       subOption = subOptions.i
        
  //   else if(category2 == "여가/생활편의")
  //       subOption = subOptions.j
        
  //   else if(category2 == "면세점")
  //       subOption = subOptions.k
        
  //   else if(category2 == "도서")
  //       subOption = subOptions.l
      
  //   }
  

  const onClick = () => {     //조회하기 버튼 클릭하면 서버에 정보 요청하기
    let fieldData = form.getFieldsValue()
      
    queryTemplete.startDate = fieldData.dateFromYear + "-" + fieldData.dateFromMonth + "-" + fieldData.dateFromDay
    queryTemplete.endDate = fieldData.dateToYear + "-" + fieldData.dateToMonth + "-" + fieldData.dateToDay
    queryTemplete.timeUnit = fieldData.timeUnit
    queryTemplete.category.name = 
    queryTemplete.category.param = 
    queryTemplete.device = fieldData.device
    queryTemplete.gender = fieldData.gender
    queryTemplete.ages.push(fieldData.ages)
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
    <Select defaultValue={options[0]} style={{width: 200, marginTop: 30, marginRight: 30}} onChange={handleOptionChange}>
      {options.map((option) => (
      <Option key={option}>{option}</Option>))}
    </Select>
    <RightOutlined />
    </Form.Item>

    <Form.Item name="category2">
    <Select defaultValue={secondMenu} style={{width: 200, marginTop: 30, marginRight: 30, marginLeft: 30}} onChange={onSecondMenuChange}>
        {menu.map((tab) => (
          <Option key={tab}>{tab}</Option>
        ))}
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
      <Radio.Button value="1m" onChange={() => onChange("1m")}>1개월</Radio.Button>
      <Radio.Button value="3m" onChange={() => onChange("3m")}>3개월</Radio.Button>
      <Radio.Button value="1y" onChange={() => onChange("1y")}>1년</Radio.Button>
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
