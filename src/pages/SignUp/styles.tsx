import styled from "styled-components";

export const styles = {
  form: {
    width: "400px",
    background: "#fff",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: 'column' as 'column'
  },
  img: {
    width: "250px",
    margin: "10px 0 40px;"
  }
};



export const Container = styled.div`
display: flex;
align-items; center;
justify-content: center;
height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
`;
