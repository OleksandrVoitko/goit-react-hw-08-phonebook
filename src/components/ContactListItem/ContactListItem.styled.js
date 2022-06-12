import styled from 'styled-components';

export const ContactItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const WrapperButtonDiv = styled.div`
  margin-left: 10px;
`;

export const ContactButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 5px;
  background-color: ${props => props.color};
  color: #fff;
  font-weight: 500px;
  margin: 10px;

  cursor: pointer;
  outline: none;
  box-shadow: 1px 1px 1px 0 ${props => props.color};
  box-shadow: 0px 0px 0px 1px ${props => props.color};

  transition-duration: 0.5s;
  :hover {
    background-color: white;
    color: ${props => props.color};
  }
`;
