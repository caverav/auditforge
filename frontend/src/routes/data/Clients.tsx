import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { createClient, createCollaborator, getClients, getCollaborators, getCompanies } from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import SelectDropdown from "../../components/dropdown/SelectDropdown";

interface NewClient {
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
}

// Las compañias deben obtenerse desde el backend
const companiesOptions = [
  { id: 1, value: "ntg" },
  { id: 2, value: "ibox" },
  { id: 3, value: "pwndoc" },
];

export const Clients: React.FC = () => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState(companiesOptions);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const [newClient, setNewClient] =
    useState<NewClient | null>({
      company: "",
      firstname: "",
      lastname: "",
      email: "",
      title: "",
      phone: "",
      cell: "",
    });

  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching clients");
        setLoading(false);
      }
    };
   
    fetchClients();
  }, []);

  const handleCancelAddCollab = () => {
    setNewClient(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createClient(newClient!);
    } catch (error) {
      setError("Error creating client");
      console.error("Error:", error);
    }
    setNewClient(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewClient((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  return (
    <>
      <Card title={t("clients")}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t("addClient")}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? "cargandooo" : JSON.stringify(clients)}</div>
        </>
      </Card>
      <Modal
        title={t("addClient")}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddCollabModal}
      >
        <>
          <SelectDropdown
            items={companies}
            title={t("company")}
            selected={selectedCompany}
            onChange={setSelectedCompany}
          />
          <SimpleInput
            label={t("firstname")}
            id={"firstname"}
            name={"firstname"}
            type={"text"}
            placeholder={"firstname"}
            value={newClient?.firstname || ""}
            onChange={(value) => handleInputChange("firstname", value)}
          />
          <SimpleInput
            label={t("lastname")}
            id={"lastname"}
            name={"lastname"}
            type={"text"}
            placeholder={"lastname"}
            value={newClient?.lastname || ""}
            onChange={(value) => handleInputChange("lastname", value)}
          />
          <SimpleInput
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={"email"}
            value={newClient?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
          />
          <SimpleInput
            label={t("title")}
            id={"title"}
            name={"title"}
            type={"text"}
            placeholder={"title"}
            value={newClient?.title || ""}
            onChange={(value) => handleInputChange("title", value)}
          />
          <SimpleInput
            label={t("phone")}
            id={"phone"}
            name={"phone"}
            type={"text"}
            placeholder={"phone"}
            value={newClient?.phone || ""}
            onChange={(value) => handleInputChange("phone", value)}
          />
          <SimpleInput
            label={t("cell")}
            id={"cell"}
            name={"cell"}
            type={"text"}
            placeholder={"cell"}
            value={newClient?.cell || ""}
            onChange={(value) => handleInputChange("cell", value)}
          />
        </>
      </Modal>
    </>
  );
};
