import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FrownOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import { ROUTE_PATHS } from "@constants";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      icon={<FrownOutlined />}
      title={t("errors.404.title")}
      subTitle={t("errors.404.subTitle")}
      extra={
        <Button type="primary" onClick={() => navigate(ROUTE_PATHS.home)}>
          {t("errors.404.btnTitle")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
