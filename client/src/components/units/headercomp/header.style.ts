import styled from "@emotion/styled";
export const Wrapper = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  /* background-color: yellow; */
`;

export const CompWrapper = styled.div`
  /* background-color: red; */
  width: 1100px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "myfont";
`;

export const LogoImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

export const LogoTxt = styled.div`
  width: 90%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: red; */
  justify-content: left;
  &:hover {
    cursor: pointer;
  }
`;

export const LogInCheckWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const RecommendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogOutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
