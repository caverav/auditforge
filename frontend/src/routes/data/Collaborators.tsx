import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { createCollaborator, getCollaborators } from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import SelectDropdown from "../../components/dropdown/SelectDropdown";

interface NewCollaborator {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
}

// Estos roles deberían venir del backend.
const rolesOptions = [
  { id: 1, value: "user" },
  { id: 2, value: "admin" },
  { id: 3, value: "report" },
];

export const Collaborators: React.FC = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState(rolesOptions);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const [newCollaborator, setNewCollaborator] =
    useState<NewCollaborator | null>({
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phone: "",
      role: selectedRole.value,
      totpenabled: false,
      username: "",
    });

  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await getCollaborators();
        setCollaborators(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching collaborators");
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  const handleCancelAddCollab = () => {
    setNewCollaborator(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createCollaborator(newCollaborator!);
    } catch (error) {
      setError("Error creating collaborator");
      console.error("Error:", error);
    }
    setNewCollaborator(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCollaborator((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  return (
    <>
      <Card title={t("collaborators")}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t("addCollaborator")}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? "cargandooo" : JSON.stringify(collaborators)}</div>
        </>
      </Card>
      <Modal
        title={t("addCollaborator")}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddCollabModal}
      >
        <>
          <SimpleInput
            label={t("username")}
            id={"username"}
            name={"username"}
            type={"text"}
            placeholder={t("username")}
            value={newCollaborator?.username || ""}
            onChange={(value) => handleInputChange("username", value)}
          />
          <SimpleInput
            label={t("firstname")}
            id={"firstname"}
            name={"firstname"}
            type={"text"}
            placeholder={t("firstname")}
            value={newCollaborator?.firstname || ""}
            onChange={(value) => handleInputChange("firstname", value)}
          />
          <SimpleInput
            label={t("lastname")}
            id={"lastname"}
            name={"lastname"}
            type={"text"}
            placeholder={t("lastname")}
            value={newCollaborator?.lastname || ""}
            onChange={(value) => handleInputChange("lastname", value)}
          />
          <SimpleInput
            label={t("password")}
            id={"password"}
            name={"password"}
            type={"text"}
            placeholder={t("password")}
            value={newCollaborator?.password || ""}
            onChange={(value) => handleInputChange("password", value)}
          />
          <SimpleInput
            label={t("phone")}
            id={"phone"}
            name={"phone"}
            type={"text"}
            placeholder={t("phone")}
            value={newCollaborator?.phone || ""}
            onChange={(value) => handleInputChange("phone", value)}
          />
          <SelectDropdown
            items={roles}
            title={t("role")}
            selected={selectedRole}
            onChange={setSelectedRole}
          />
          <SimpleInput
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={t("email")}
            value={newCollaborator?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
          />
        </>
      </Modal>
    </>
  );
};
