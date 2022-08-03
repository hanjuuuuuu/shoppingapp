import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Select, Row, Button, Typography, Checkbox, Radio } from 'antd';
import { RightOutlined } from '@ant-design/icons';
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

const subOptions = {
  a:['여성의류', '여성언더웨어/잠옷', '남성의류', '남성언더웨어/잠옷'], b:['여성신발','남성신발','신발용품','여성가방','남성가방','여행용가방/소품','지갑','벨트','모자','장갑'],
  c:['클렌징', '마스크/팩'], d:['PC', '모니터'], e:['수납가구', '아동/주니어가구', '서재/사무용가구'], f:['이유식', '아기간식', '수유용품'], g:['반찬','과자/베이커리','음료'],
  h:['자전거', '스키/보드', '낚시'], i:['자동차용품','수집품'], j:['원데이클래스','국내여행/체험'], k:['화장품','향수','시계/기프트'], l:['소설','시/에세이','경제/경영']
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

  const categoryChange = (category2) => {    //분야별 분야에 맞는 2분류로 변경
    let categoryset = form.getFieldsValue()
    console.log("++++++++++")
    if(category2 == "패션의류"){
        var subOption = subOptions.a
        categoryset.category2 = subOption
        form.setFieldsValue(categoryset)
    }
    else if(category2 == "패션잡화"){
      console.log("++++++++++")
        var subOption = subOptions.b
        categoryset.category2 = subOption
        form.setFieldsValue(categoryset)
        console.log(categoryset)
    }
    else if(category2 == "화장품/미용"){
        var subOption = subOptions.c
        categoryset.category2 = subOption
        form.setFieldsValue(categoryset)
    }
    else if(category2 == "디지털/가전")
        var subOption = subOptions.d
        
    else if(category2 == "가구/인테리어")
        var subOption = subOptions.e
        
    else if(category2 == "출산/육아")
        var subOption = subOptions.f
        
    else if(category2 == "식품")
        var subOption = subOptions.g
        
    else if(category2 == "스포츠/레저")
        var subOption = subOptions.h
        
    else if(category2 == "생활/건강")
        var subOption = subOptions.i
        
    else if(category2 == "여가/생활편의")
        var subOption = subOptions.j
        
    else if(category2 == "면세점")
        var subOption = subOptions.k
        
    else if(category2 == "도서")
        var subOption = subOptions.l
      
    }
  

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
    <Select defaultValue="패션의류" style={{width: 200, marginTop: 30, marginRight: 30}}>
      <Option value="패션의류" onChange={()=>categoryChange("패션의류")}>패션의류</Option>
      <Option value="패션잡화" onChange={()=>categoryChange("패션잡화")}>패션잡화</Option>
      <Option value="화장품/미용" onChange={()=>categoryChange("화장품/미용")}>화장품/미용</Option>
      <Option value="디지털/가전" onChange={()=>categoryChange("디지털/가전")}>디지털/가전</Option>
      <Option value="가구/인테리어" onChange={()=>categoryChange("가구/인테리어")}>가구/인테리어</Option>
      <Option value="출산/육아" onChange={()=>categoryChange("출산/육아")}>출산/육아</Option>
      <Option value="식품" onChange={()=>categoryChange("식품")}>식품</Option>
      <Option value="스포츠/레저" onChange={()=>categoryChange("스포츠/레저")}>스포츠/레저</Option>
      <Option value="생활/건강" onChange={()=>categoryChange("생활/건강")}>생활/건강</Option>
      <Option value="여가/생활편의" onChange={()=>categoryChange("여가/생활편의")}>여가/생활편의</Option>
      <Option value="면세점" onChange={()=>categoryChange("면세점")}>면세점</Option>
      <Option value="도서" onChange={()=>categoryChange("도서")}>도서</Option>
    </Select>
    <RightOutlined />
    </Form.Item>

    <Form.Item name="category2">
    <Select id="category2-1" defaultValue="2분류" style={{width: 200, marginTop: 30, marginRight: 30, marginLeft: 30}}>
      <Option value="여성의류">여성의류</Option>
      <Option value="여성언더웨어/잠옷">여성언더웨어/잠옷</Option>
      <Option value="남성의류">남성의류</Option>
      <Option value="남성언더웨어/잠옷">남성언더웨어/잠옷</Option>
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
