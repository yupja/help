import React,{ useState,useEffect,useRef}from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import CommunityTab from "../components/CommunityTab";
import HeaderMenue from "../components/HeaderMenu";

import styled from "styled-components";


const Community = () => {
    const { state } = useLocation();
    console.log(state);

    const navigate = useNavigate();
    const [page, setPage] = useState(<CommunityTab/>);


    return(
        <div className="wrap">
            <div className="topWrap" style={{background:"white"}}>
                <HeaderMenue state={state}/>            
            </div>

            <MenuBar>
                    <div>티끌자랑</div>
                    <div>쓸까말까</div>
            </MenuBar>

            <div style={{width:"100%"}}>
                <RealTimeBox>
                    <TimeList></TimeList>
                </RealTimeBox>

                <CommunityContents>
                    {page}
                </CommunityContents>
            </div>
        </div>
        
    ) 
};


const MenuBar = styled.div`
display: flex;
justify-content: center;
justify-content: space-evenly;
width : 100%;


div{
    width: 45%;
    border: 1px solid #CCCCCC;
    text-align: center;
    padding: 10px;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
}
`;

const RealTimeBox = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 100%;
background: #F5F5F5;
height: 4%;
`;

const TimeList = styled.div`
width: 96%;
height: 85%;
display: flex;
align-items: center;
justify-content: center;
background: white;
box-shadow:initial;
border-radius: 10px;
`;




const CommunityContents = styled.div`

`;

export default Community;