import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { getCompanies, createCompany } from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import ImageInput from "../../components/input/ImageInput";

interface NewCompany {
  name: string;
  shortname: string;
  logo: string;
}

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  const [newCompany, setNewCompany] = useState<NewCompany | null>({
    name: "",
    shortname: "",
    logo: "",
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching company");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCancelAddCollab = () => {
    setNewCompany(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createCompany(newCompany!);
    } catch (error) {
      setError("Error creating company");
      console.error("Error:", error);
    }
    setNewCompany(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCompany((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleImageSelect = (base64String: string) => {
    setNewCompany((prevState) => ({
      ...prevState!,
      logo: base64String,
    }));
  };

  return (
    <>
      <Card title={t("companies")}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t("addCompany")}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? "cargandooo" : JSON.stringify(companies)}</div>
        </>
      </Card>
      <Modal
        title={t("addCompany")}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddCollabModal}
      >
        <>
          <SimpleInput
            label={t("name")}
            id={"name"}
            name={"name"}
            type={"text"}
            placeholder={t("name")}
            value={newCompany?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <SimpleInput
            label={t("shortName")}
            id={"shortname"}
            name={"shortname"}
            type={"text"}
            placeholder={t("shortName")}
            value={newCompany?.shortname || ""}
            onChange={(value) => handleInputChange("shortname", value)}
          />
          <ImageInput
            label={t("logo")}
            id={"logo"}
            name={"logo"}
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
    </>
  );
};
