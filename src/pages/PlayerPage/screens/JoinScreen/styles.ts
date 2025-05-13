import { Form, FormProps } from "antd";
import styled from "styled-components";

import { FormFieldType } from "./types.ts";

export const StyledForm = styled(Form)<FormProps<FormFieldType>>`
  max-width: 300px;
  margin: 0 auto;
`;
