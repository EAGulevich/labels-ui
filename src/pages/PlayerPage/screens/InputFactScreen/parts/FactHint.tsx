import { useTranslation } from "react-i18next";
import { Alert, Flex } from "antd";

export const FactHint = () => {
  const { t } = useTranslation();
  return (
    <Alert
      showIcon
      closable
      message={t("inputFactScreen.form.fields.fact.message.title")}
      type="warning"
      description={
        <Flex vertical>
          {t("inputFactScreen.form.fields.fact.message.description.listTitle")}
          <ul>
            <li>
              {t(
                "inputFactScreen.form.fields.fact.message.description.examples.breakfast",
              )}
            </li>
            <li>
              {t(
                "inputFactScreen.form.fields.fact.message.description.examples.songs",
              )}
            </li>
            <li>
              {t(
                "inputFactScreen.form.fields.fact.message.description.examples.dream",
              )}
            </li>
          </ul>
        </Flex>
      }
    />
  );
};
