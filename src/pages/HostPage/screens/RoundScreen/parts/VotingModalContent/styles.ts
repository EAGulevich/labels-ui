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
  width: calc(80px * ${({ items }) => items?.length});
`;
