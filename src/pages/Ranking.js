import styled from "styled-components";
import { useLocation } from "react-router";

import HeaderMenue from "../components/HeaderMenu";

function Ranking() {
  const { state } = useLocation();
  return (
    <div className="wrap">
      <div className="topWrap">
        <HeaderMenue state={state} />
      </div>
    </div>
  )
};

export default Ranking;