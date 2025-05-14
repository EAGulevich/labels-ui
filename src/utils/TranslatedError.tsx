import { Trans } from "react-i18next";

type Translations = typeof import("../i18n/locales/en/translation.json");

export const TranslatedError = ({
  errorCode,
}: {
  errorCode: keyof Translations["errorMessages"];
}) => {
  return <Trans i18nKey={`errorMessages.${errorCode}`} />;
};
