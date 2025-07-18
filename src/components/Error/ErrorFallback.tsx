import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Col, Result, Row } from "antd";

import { ROUTE_PATHS } from "@constants";

export const ErrorFallback = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Row justify={"center"}>
      <Col span={12}>
        <Result
          icon={<FrownOutlined />}
          title={t("errors.gameWasNotFound.title")}
          subTitle={t("errors.gameWasNotFound.subTitle")}
          extra={
            <Button type="primary" onClick={() => navigate(ROUTE_PATHS.home)}>
              {t("errors.gameWasNotFound.btnTitle")}
            </Button>
          }
        />
      </Col>
    </Row>
  );
};
