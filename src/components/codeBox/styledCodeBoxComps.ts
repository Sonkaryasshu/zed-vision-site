import styled from "styled-components";

export const Header = styled.div`
    background: #3f51b5;
    font-family: "Roboto";
    width: 100%;
    margin: 0;
    padding: 10px 20px 10px;
    color: white
`;

export const Container = styled.div`
    display: block;
    width: 100%;
    height: 60vh;
`;

export const CodeContainer = styled.div`
    display: block;
    width: 100%;
    height: 60%;
`;

export const ResultContainer = styled.div`
    display: block;
    width: 100%;
    background: grey;
    height: 220px;
`;

export const ResultBox = styled.div`
  text-align: center;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  display: flex;
  place-content: center;
  place-items: center;
  margin: 0;
  padding: 0;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;

export const ResultBoxContainer = styled.div`
display: block;
width: 150px;
height: 150px;
overflow: hidden;
`;
