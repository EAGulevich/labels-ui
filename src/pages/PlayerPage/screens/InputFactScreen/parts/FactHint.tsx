import { useTranslation } from "react-i18next";
import { Collapse, Flex } from "antd";

export const FactHint = () => {
  const { t } = useTranslation();
  return (
    <Collapse
      bordered={false}
      expandIconPosition={"end"}
      items={[
        {
          key: "examples",
          label: t("inputFactScreen.form.fields.fact.hint.title"),
          children: (
            <Flex vertical>
              <ul>
                <li>
                  {t(
                    "inputFactScreen.form.fields.fact.hint.examples.breakfast",
                  )}
                </li>
                <li>
                  {t("inputFactScreen.form.fields.fact.hint.examples.songs")}
                </li>
                <li>
                  {t("inputFactScreen.form.fields.fact.hint.examples.dream")}
                </li>
              </ul>
            </Flex>
          ),
        },
      ]}
    />
  );
};
