import { useTranslation } from "react-i18next";
import PrimaryButton from "../../../components/button/PrimaryButton";
import EditCard from "../../../components/card/EditCard";
import SimpleInput from "../../../components/input/SimpleInput";
import { useEffect, useState } from "react";
import {
  createLanguage,
  getLanguages,
  updateLanguages,
} from "../../../services/data";
import LanguageList from "./LanguageList";

export const Languages: React.FC = () => {
  const { t } = useTranslation();
  const [newLanguage, setNewLanguage] = useState("");
  const [newLocale, setNewLocale] = useState("");

  const [languages, setLanguages] = useState<
    { language: string; locale: string }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data.datas);
        setLoading(false);
      } catch (err) {
        setError("Error fetching company");
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleAddLanguage = async () => {
    try {
      await createLanguage({ language: newLanguage, locale: newLocale });
    } catch (error) {
      setError("Error creating language");
      console.error("Error:", error);
      setNewLanguage("");
      setNewLocale("");
      return;
    }
    setNewLanguage("");
    setNewLocale("");
  };

  /**
   * Lógica para hacer uptdate (PUT)
   * de los lenguajes.
   */
  const [newLanguageList, setNewLanguageList] = useState<
    { language: string; locale: string }[]
  >([]);

  const handleUpdateLanguageList = (
    data: { language: string; locale: string }[]
  ) => {
    setNewLanguageList(data);
  };

  const onClickSave = async () => {
    try {
      await updateLanguages(newLanguageList);
    } catch (error) {
      setError("Error updating languages");
      console.error("Error:", error);
      return;
    }
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SimpleInput
          label={t("language")}
          id={t("language")}
          name={t("language")}
          type="text"
          placeholder={t("language")}
          value={newLanguage}
          onChange={setNewLanguage}
        />
        <SimpleInput
          label={t("locale")}
          id={t("locale")}
          name={t("locale")}
          type="text"
          placeholder={t("locale")}
          value={newLocale}
          onChange={setNewLocale}
        />
        <div>
          <PrimaryButton onClick={handleAddLanguage}>+</PrimaryButton>
        </div>
      </div>
      <EditCard
        title={t("listOfLanguages")}
        isEditing={isEditing}
        editTitle="edit"
        onClickEdit={() => setIsEditing(true)}
        onClickSave={onClickSave}
        onClickCancel={() => setIsEditing(false)}
      >
        <>
          {loading ? (
            t("loading")
          ) : (
            <>
              <LanguageList
                data={languages}
                isDisabled={!isEditing}
                onUpdateList={handleUpdateLanguageList}
              />
            </>
          )}
        </>
      </EditCard>
    </div>
  );
};
