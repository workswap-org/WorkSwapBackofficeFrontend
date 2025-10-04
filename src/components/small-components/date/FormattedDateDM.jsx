import { useTranslation } from "react-i18next";

const FormattedDateDM = ({ isoDate }) => {
    const { i18n } = useTranslation();
    const locale = i18n.language || "fi";
    if (!isoDate) return null;

    const date = new Date(isoDate);

    const options = {
        day: "2-digit",
        month: "long"
    };

    const formatted = new Intl.DateTimeFormat(locale, options).format(date);

    return <span>{formatted}</span>;
};

export default FormattedDateDM;