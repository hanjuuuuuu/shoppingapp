import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Select, Row, Button, Typography, Checkbox, Radio } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'antd/dist/antd.min.css';

const { Option } = Select;
const moment = require('moment')

let date = new Date();    //날짜 초기값 설정
let year = String(date.getFullYear());
let tmonth = date.getMonth();
tmonth += 1;
if(tmonth <= 9){   //두자리 수로 반환
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

const options = ['패션의류', '패션잡화', '화장품/미용', '디지털/가전', '가구/인테리어', '출산/육아', '식품', '면세점', '도서'];

const subOptions = {
  '패션의류':['여성의류', '남성의류'], '패션잡화':['여성신발','남성신발','여성가방','남성가방'],
  '화장품/미용':['스킨케어','클렌징', '마스크','향수'], '디지털/가전':['PC', '카메라'], '가구/인테리어':['침실가구','거실가구','수납가구'], '출산/육아':['분유','기저귀','이유식'],
  '식품':['반찬','과자/베이커리','음료'], '면세점':['시계/기프트', '주얼리'], '도서':['소설','시/에세이','경제/경영', '인문']
}

const subOptions2 = {
  '여성의류':['니트/스웨터', '가디건', '원피스'], '남성의류':['니트/스웨터','티셔츠','셔츠/남방'],
  '여성신발':['부츠','워커'],'남성신발':['운동화','슬리퍼'],'여성가방':['백팩','숄더백'],'남성가방':['백팩','크로스백'],
  '스킨케어':['스킨/토너','로션'], '클렌징':['클렌징폼','클렌징오일'], '마스크':['마스크시트','필오프팩'],'향수':['여성향수','남성향수','남녀공용향수'],
  'PC':['브랜드PC','서버/워크스테이션'], '카메라':['DSLR카메라','필름카메라'], '침실가구':['침대','매트리스'],'거실가구':['소파','테이블'],'수납가구':['행거','수납장'],
  '분유':['국내분유','수입분유'],'기저귀':['국내기저귀','수입기저귀'],'이유식':['가공이유식','수제이유식'], '반찬':['절임류','조림류','볶음류'],'과자/베이커리':['쿠키','초콜릿','사탕'],
  '음료':['생수','탄산수','커피'], '시계/기프트':['시계','필기도구'], '주얼리':['귀걸이','목걸이','반지'], 
  '소설':['고전/문학','장르소설'], '시/에세이':['한국시','외국시'],'경제/경영':['경제','경영'], '인문':['심리','철학']
}

const App = () => {
  const [form] = Form.useForm();

  const[menu, setMenu] = useState(subOptions[options[0]]);
  const[secondMenu, setSecondMenu] = useState("2분류");
  const[thirdMenu, setThirdMenu] = useState("3분류");
  
  const queryTemplete = {
    "startDate": "",
    "endDate": "",
    "timeUnit": "",
    "category": [
      {"name":"", "param": []},
      {"name":"", "param": []}
    ],
    "device": "",
    "gender": "",
    "ages": []
  
    }

  const handleOptionChange = (value) => {   //처음 카테고리 선택에 따라 2분류를 해당 값으로 출력 && 3분류 사라지게 하기
    setMenu(subOptions[value]);
    setSecondMenu("2분류");
    
    let categorydata = form.getFieldsValue()
    categorydata.category2 = "2분류"
    form.setFieldsValue(categorydata)

    console.log(value)

    return value
  }
  
  const onSecondMenuChange = (value) => {   //2분류 선택에 따라 3분류를 해당 값으로 출력
    setSecondMenu(subOptions2[value]);
    setThirdMenu("3분류");

    return value
  }

  const onThirdMenuChange = (value) => {  //3분류 선택되면 해당 값으로 출력
    setThirdMenu(value);

    return value
  }

  const checkParam = (value) => {   //param지정
    if (value === '패션의류')
      var paramdata = "50000000"
    else if (value === '패션잡화')
       paramdata = "50000001"
    else if (value === '화장품/미용')
       paramdata = "50000002"
    else if (value === '디지털/가전')
       paramdata = "50000003"
    else if (value === '가구/인테리어')
       paramdata = "50000004"
    else if (value === '출산/육아')
       paramdata = "50000005"
    else if (value === '식품')
       paramdata = "50000006"
    else if (value === '스포츠/레저')
       paramdata = "50000007"
    else if (value === '면세점')
       paramdata = "500000010"
    else if (value === '도서')
       paramdata = "500005542"

    else if (value === '여성의류')
       paramdata = "50000167"
    else if (value === '남성의류')
       paramdata = "50000169"
    else if (value === '여성신발')
       paramdata = "50000173"
    else if (value === '남성신발')
       paramdata = "50000174"
    else if (value === '여성가방')
       paramdata = "50000176"
    else if (value === '남성가방')
       paramdata = "50000177"
    else if (value === '스킨케어')
       paramdata = "50000190"
    else if (value === '클렌징')
       paramdata = "50000192"
    else if (value === '마스크') 
       paramdata = "50000193"
    else if (value === '향수')
       paramdata = "50000200"
    else if (value === 'PC')
       paramdata = "50000089"
    else if (value === '카메라')
       paramdata = "50000206"
    else if (value === '침실가구')
       paramdata = "50000100"
    else if (value === '거실가구')
       paramdata = "50000101"
    else if (value === '수납가구')
       paramdata = "50000103"
    else if (value === '분유')
       paramdata = "50000115"
    else if (value === '기저귀')
       paramdata = "50000116"
    else if (value === '이유식')
       paramdata = "50000118"
    else if (value === '반찬')
       paramdata = "50000146"
    else if (value === '과자/베이커리')
       paramdata = "50000149"
    else if (value === '음료')
       paramdata = "50000148"
    else if (value === '시계/기프트')
       paramdata = "50000015"
    else if (value === '주얼리')
       paramdata = "50000016"
    else if (value === '소설')
       paramdata = "50005543"
    else if (value === '시/에세이')
       paramdata = "50005544"
    else if (value === '경제/경영')
       paramdata = "50005549"
    else if (value === '인문')
       paramdata = "50005545"

    else if (value === '니트/스웨터')
       paramdata = "50000805"
    else if (value === '가디건')
       paramdata = "50000806"
    else if (value === '원피스')
       paramdata = "50000807"
    else if (value === '니트/스웨터')
       paramdata = "50000831"
    else if (value === '티셔츠')
       paramdata = "50000830"
    else if (value === '셔츠/남방')
       paramdata = "50000833"
    else if (value === '부츠')
       paramdata = "50001462"
    else if (value === '워커')
       paramdata = "50001461"
    else if (value === '운동화')
       paramdata = "50001466"
    else if (value === '슬리퍼')
       paramdata = "50000790"
    else if (value === '백팩')
       paramdata = "50000644"
    else if (value === '숄더백')
       paramdata = "50000639"
    else if (value === '백팩')
       paramdata = "50000651"
    else if (value === '크로스백')
       paramdata = "50000648"
    else if (value === '스킨/토너')
       paramdata = "50000437"
    else if (value === '로션')
       paramdata = "50000438"
    else if (value === '클렌징폼')
       paramdata = "50000451"
    else if (value === '클렌징오일')
       paramdata = "50000452"
    else if (value === '마스크시트')
       paramdata = "50000463"
    else if (value === '필오프백')
       paramdata = "50000464"
    else if (value === '여성향수')
       paramdata = "50000312"
    else if (value === '남성향수')
       paramdata = "50000313"
    else if (value === '남녀공용향수')
       paramdata = "50000314"
    else if (value === 'DSLR카메라')
       paramdata = "50005545"
    else if (value === '필름카메라')
       paramdata = "50005545"
    else if (value === '브랜드PC')
       paramdata = "50001737"
    else if (value === '서버/워크스테이션')
       paramdata = "50001739"
    else if (value === '침대')
       paramdata = "50001228"
    else if (value === '매트리스')
       paramdata = "50001229"
    else if (value === '소파')
       paramdata = "50001234"
    else if (value === '테이블')
       paramdata = "50001235"
    else if (value === '행거')
       paramdata = "50001319"
    else if (value === '수납장')
       paramdata = "50001320"
    else if (value === '국내분유')
       paramdata = "50000854"
    else if (value === '수입분유')
       paramdata = "50000855"
    else if (value === '국내기저귀')
       paramdata = "50000729"
    else if (value === '수입기저귀')
       paramdata = "50000730"
    else if (value === '가공이유식')
       paramdata = "50009344"
    else if (value === '수제이유식')
       paramdata = "50009720"
    else if (value === '절임류')
       paramdata = "50002015"
    else if (value === '조림류')
       paramdata = "50002016"
    else if (value === '볶음류')
       paramdata = "50014360"
    else if (value === '쿠키')
       paramdata = "50001999"
    else if (value === '초콜릿')
       paramdata = "50002000"
    else if (value === '사탕')
       paramdata = "50002001"
    else if (value === '생수')
       paramdata = "50002032"
    else if (value === '탄산수')
       paramdata = "50002033"
    else if (value === '커피')
       paramdata = "50001081"
    else if (value === '시계')
       paramdata = "50000795"
    else if (value === '필기도구')
       paramdata = "50001667"
    else if (value === '귀걸이')
       paramdata = "50001673"
    else if (value === '목걸이')
       paramdata = "50001674"
    else if (value === '반지')
       paramdata = "50001675"
    else if (value === '고전/문학')
       paramdata = "50005569"
    else if (value === '장르소설')
       paramdata = "50005570"
    else if (value === '한국시')
       paramdata = "50011720"
    else if (value === '외국시')
       paramdata = "50011740"
    else if (value === '경제')
       paramdata = "50005617"
    else if (value === '경영')
       paramdata = "50005618"
    else if (value === '심리')
       paramdata = "50005583"
    else if (value === '철학')
       paramdata = "50005585"

    return paramdata
  }

  // useEffect(() =>{
  //   console.log('______________')
  //   console.log(menu)
  //   console.log(secondMenu)
  //   console.log(thirdMenu)

  // },[secondMenu]);

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

    if(timerange === "1m") 
      dateset = moment(dateset).subtract(1, 'months').format("YYYYMMDD")  
    else if(timerange === "3m")
      dateset= moment(dateset).subtract(3, 'months').format("YYYYMMDD")
    else if(timerange === "1y")
      dateset = moment(dateset).subtract(1, 'years').format("YYYYMMDD") 

    let finalDate = getDay(dateset)
    form.setFieldsValue(finalDate)
  }

  const selfChange = () => {      //날짜 직접 바꾸면 라디오버튼을 직접입력으로 변경 
    let sbutton = form.getFieldsValue()
    sbutton.daterange = "self"
    form.setFieldsValue(sbutton)
  }   
  
  const genderChange = (arrayGender) => {    //여성과 남성 둘 다 선택할 경우, 성별 전체로 변경
    if(arrayGender.includes(''))
      return ""
    else if(arrayGender.includes('m') && arrayGender.includes('f'))
      return ""
    else 
      return arrayGender.join()
  }

  const deviceChange = (arrayDevice) => {   //PC와 모바일 둘 다 선택할 경우, 기기 전체로 변경
    if(arrayDevice.includes(''))
      return ""
    else if(arrayDevice.includes('pc') && arrayDevice.includes('mo'))
      return ""
    else 
      return arrayDevice.join()
  }

  const onClick = () => {     //조회하기 버튼 클릭하면 서버 정보 생성하기
    let fieldData = form.getFieldsValue()
      
    queryTemplete.startDate = fieldData.dateFromYear + "-" + fieldData.dateFromMonth + "-" + fieldData.dateFromDay
    queryTemplete.endDate = fieldData.dateToYear + "-" + fieldData.dateToMonth + "-" + fieldData.dateToDay
    queryTemplete.timeUnit = fieldData.timeUnit
    queryTemplete.category[0].name = fieldData.category
    queryTemplete.category[1].name = fieldData.category2
    //queryTemplete.category[2].name = fieldData.category3
    queryTemplete.category[0].param.length = 0;
    queryTemplete.category[1].param.length = 0;
    //queryTemplete.category[2].param.length = 0;
    queryTemplete.category[0].param.push(checkParam(fieldData.category))
    queryTemplete.category[1].param.push(checkParam(fieldData.category2))
    // queryTemplete.category[1].param.push()
    // queryTemplete.category[2].param.push()
    queryTemplete.device = deviceChange(fieldData.device)
    queryTemplete.gender = genderChange(fieldData.gender)
    queryTemplete.ages.length = 0;
    queryTemplete.ages.push(fieldData.ages)
    
    

    console.log(queryTemplete)

    // axios.post(

    // )
    // .then((response) => {

    // })
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
      {options.map((menu1) => (
      <Option key={menu1}>{menu1}</Option>
      ))}
    </Select>
    <RightOutlined />
    </Form.Item>

    <Form.Item name="category2">
    <Select defaultValue={secondMenu} style={{width: 200, marginTop: 30, marginRight: 30, marginLeft: 30}} onChange={onSecondMenuChange}>
        {menu.map((menu2) => (
          <Option key={menu2}>{menu2}</Option>
        ))}
    </Select>
    </Form.Item>

        
    {
      //secondMenu가 선택되지 않으면(2분류이면) 빈값, 선택되면(값이 변경됨) 3분류 출력
      secondMenu === '2분류' ? <></> :
        <Form.Item name="category3">
        <RightOutlined />
        <Select value={thirdMenu} style={{width: 200, marginTop: 30, marginRight: 30, marginLeft: 30}} onChange={onThirdMenuChange}>
            {secondMenu.map((menu3) => (
              <Option key={menu3}>{menu3}</Option>
            ))}
        </Select>
        </Form.Item>     
    }


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
          <Checkbox.Group style={{width: '100%', marginLeft: 10}} >
            <Checkbox value="">전체</Checkbox>
            <Checkbox value="pc">PC</Checkbox>
            <Checkbox value="mo">모바일</Checkbox>
          </Checkbox.Group> 
        </Form.Item>
        <Typography.Text style={{marginLeft:15, marginRight: 15}}>|</Typography.Text>
      <Typography.Text strong>성별</Typography.Text>
        <Form.Item name="gender"> 
          <Checkbox.Group style={{width: '100%', marginLeft: 10}}>
            <Checkbox value="" >전체</Checkbox>
            <Checkbox value="f" >여성</Checkbox>
            <Checkbox value="m" >남성</Checkbox>
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
