import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import {
  createCollaborator,
  getCollaborators,
  getRoles,
  updateCollaborator,
} from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";
import UITable from "../../components/table/UITable";
import PrimarySwitch from "../../components/switch/PrimarySwitch";

interface NewCollaborator {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
  enabled?: boolean;
}

interface RoleOption {
  id: number;
  value: string;
}

export const Collaborators: React.FC = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);

  const [newCollaborator, setNewCollaborator] =
    useState<NewCollaborator | null>(
      selectedRole
        ? {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            phone: "",
            role: selectedRole.value,
            totpenabled: false,
            username: "",
          }
        : null
    );

  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollaborators = async () => {
    try {
      const data = await getCollaborators();
      setCollaborators(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError("Error fetching collaborators");
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      const rolesOptions: RoleOption[] = data.datas.map(
        (role: string, index: number) => ({
          id: index + 1,
          value: role,
        })
      );
      setRoles(rolesOptions);
      setSelectedRole(rolesOptions[0]);
      setLoading(false);
    } catch (err) {
      setError("Error fetching roles");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
    fetchRoles();
  }, []);

  const columns = [
    {
      header: t("username"),
      accessor: "username",
      sortable: true,
      filterable: true,
    },
    {
      header: t("firstname"),
      accessor: "firstname",
      sortable: true,
      filterable: true,
    },
    {
      header: t("lastname"),
      accessor: "lastname",
      sortable: true,
      filterable: true,
    },
    { header: t("email"), accessor: "email", sortable: true, filterable: true },
    { header: t("role"), accessor: "role", sortable: true, filterable: true },
  ];

  type TableData = {
    _id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    phone: string;
    role: string;
    totpenabled: boolean;
    username: string;
    enabled?: boolean;
  };

  const keyExtractor = (item: any) => item.id;

  const handleEditCompanyButton = (collaborator: TableData) => {
    setNewCollaborator({
      ...collaborator,
      enabled: collaborator.enabled ?? false
    });
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };
  const rowActions = [
    {
      label: "Edit",
      onClick: (item: TableData) => handleEditCompanyButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    collaborators,
    columns
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    collaborators,
    columns,
    setTableData
  );

  useEffect(() => {
    const newFilteredData = collaborators?.filter((item) =>
      columns.every((column) => {
        const filterValue = filters[column.accessor];
        if (!filterValue) {
          return true;
        }
        return String(item[column.accessor as keyof TableData]) // IMPORTANTE Definir la TableData (columnas) como tipo para estos casos.
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
    setTableData(newFilteredData ?? []);
  }, [filters]);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);
  const [isOpenEditCollabModal, setIsOpenEditCollabModal] = useState(false);

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
    fetchCollaborators();
  };

  const handleCancelEditCollab = () => {
    setNewCollaborator(null);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };

  const handleSubmitEditCollab = async () => {
    try {
      await updateCollaborator(newCollaborator!);
    } catch (error) {
      setError("Error updating collaborator");
      console.error("Error:", error);
    }
    setNewCollaborator(null);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
    fetchCollaborators();
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            <PrimaryButton
              onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
            >
              {t("addCollaborator")}
            </PrimaryButton>
          </div>
          <UITable
            columns={columns}
            data={tableData}
            keyExtractor={keyExtractor}
            onSort={handleSorting}
            filters={filters}
            onFilter={handleFilterChange}
            rowActions={rowActions}
            emptyState={<div>{t("err.noMatchingRecords")}</div>}
          ></UITable>
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
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={t("email")}
            value={newCollaborator?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
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
            label={t("password")}
            id={"password"}
            name={"password"}
            type={"text"}
            placeholder={t("password")}
            value={newCollaborator?.password || ""}
            onChange={(value) => handleInputChange("password", value)}
          />
        </>
      </Modal>
      <Modal
        title={t("editCollaborator")}
        onCancel={handleCancelEditCollab}
        onSubmit={handleSubmitEditCollab}
        cancelText={t("btn.cancel")}
        submitText={t("btn.update")}
        isOpen={isOpenEditCollabModal}
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
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={t("email")}
            value={newCollaborator?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
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
            label={t("password")}
            id={"password"}
            name={"password"}
            type={"text"}
            placeholder={t("password")}
            value={newCollaborator?.password || ""}
            onChange={(value) => handleInputChange("password", value)}
          />
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <PrimarySwitch 
              enabled={!!newCollaborator?.enabled}
              onChange={() => 
                setNewCollaborator((prevState) => 
                  prevState ? { ...prevState, enabled: !prevState.enabled } : null
                )
              }
            />
            <span style={{ marginLeft: "10px" }}>
              {newCollaborator?.enabled ? t("btn.accountEnabled") : t("btn.accountDisabled")}
            </span>
          </div>
        </>
      </Modal>
    </>
  );
};
