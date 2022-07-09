import React, {useRef, useState}  from "react";

import styled from 'styled-components'

const Category = (props ) => {

  const handleChange = event => {
    props.setCategory(event.target.value);
  };

  return (
    <SelectBox onChange={handleChange} defaultValue={0}>
      <option value={0} 
              disabled 
              style={{display:"none"}}
              >카테고리가 뭘까요?</option>
      <option value={1}>패션</option>
      <option value={2}>패션잡화</option>
      <option value={3}>화장품/미용</option>
      <option value={4}>가구/인테리어</option>
      <option value={5}>출산/유아동</option>
      <option value={6}>반려동물</option>
      <option value={7}>생활/주방용품</option>
      <option value={8}>가전/디지털</option>
      <option value={9}>스포츠/레저</option>
      <option value={10}>헬스(건강)/의료용품</option>
      <option value={11}>자동차/공구</option>
      <option value={12}>완구/취미</option>
      <option value={13}>문서/오피스</option>
      <option value={14}>도서/음반</option>
    </SelectBox>
  );
}




const SelectBox = styled.select`
text-align: center;
border-radius: 20px;
font-size: 16px;
padding: 11px;
`;
export default Category;