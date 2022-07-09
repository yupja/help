import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as Star } from "../public/img/svg/Star.svg";
import { ReactComponent as StarColor } from "../public/img/svg/StarColor.svg";

function SaveItemList(props) {
  console.log(props)
  const listInfo = props.list;
  console.log(listInfo)


  return (
    <>
      <ItemList toggle={props.toggle}>
        <ul>
          {listInfo.length === 0 ?
            null :
            <>
              {listInfo && listInfo.map((list, idx) => (
                <li key={"b" + list.id}>
                  <div className="leftBox">
                    <Star />
                    <p>{list.year}<br />{list.day}</p>
                    <h2>{list.title}</h2>
                  </div>
                  <p>{list.price}</p>
                </li>
              ))}
            </>
          }
        </ul>
      </ItemList>
    </>
  )
};


export default SaveItemList;


const ItemList = styled.div`
width: 100%;
display: ${props => (props.toggle ? 'block' : 'none')};

h2 {
  font-size: 0.87rem;
  font-weight: 700;
}
ul{
  padding: 0 10px;
}
li{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #CCCCCC;
  align-items: center;
  padding: 10px 15px;
}
.leftBox{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
}
.leftBox p{
  font-size: 0.62rem;
  color: #999;
  text-align: left;
  padding: 0 10px;
}
span{

}


`
