import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { createTemplates, getTemplates } from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import FileInput from "../../components/input/FileInput";

interface NewTemplate {
  name: string;
  ext: string;
  file: string;
}

export const Templates: React.FC = () => {
  const { t } = useTranslation();

  const [newTemplate, setNewTemplate] =
  useState<NewTemplate | null>({
    name: "",
    ext: "",
    file: "",
  });

  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching company");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCancelAddCollab = () => {
    setNewTemplate(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createTemplates(newTemplate!);
    } catch (error) {
      setError("Error creating company");
      console.error("Error:", error);
    }
    setNewTemplate(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewTemplate((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleFileSelect = (ext: string, content: string) => {
    setNewTemplate((prevState) => ({
      ...prevState!,
      ext: ext,
      file: content, 
    }));
  };

  return (
    <>
      <Card title={t("templates")}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t("addTemplate")}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? "cargandooo" : JSON.stringify(templates)}</div>
        </>
      </Card>
      <Modal
        title={t("addTemplate")}
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
            placeholder={"name"}
            value={newTemplate?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <FileInput
            label={t("Upload Template")}
            id={"template"}
            name={"template"}
            onFileSelect={(file) => handleFileSelect(file.name.split('.').pop() || "", file.content)}
          />
        </>
      </Modal>
    </>
  );
};
