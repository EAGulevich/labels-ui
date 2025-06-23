import { StepProps, Steps } from "antd";
import styled from "styled-components";

const PointHeight = "6px";

export const VotePoint = styled.div`
  width: ${PointHeight};
  height: ${PointHeight};
  border-radius: 1px;
  background: ${({ theme }) => theme.token.colorTextBase};
`;

export const VoteBlock = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 10px;
  min-height: ${PointHeight};
`;

export const StyledSteps = styled(Steps)<StepProps>`
  padding: 0 40px;

  //TODO: классы
  .ant-steps-item-description {
    word-wrap: break-word;
  }

  .ant-steps-item.ant-steps-item-error,
  .ant-steps-item.ant-steps-item-finish {
    .ant-steps-item-tail {
      &::after {
        background-color: ${({ theme }) => theme.token.colorPrimary};
      }
    }
  }
`;

export const FactTitle = styled.div`
  text-align: center;
`;
