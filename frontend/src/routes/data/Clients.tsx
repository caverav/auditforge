import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import {
  createClient,
  getClients,
  getCompanies,
  updateClient,
  deleteClient,
} from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";
import UITable from "../../components/table/UITable";

interface NewClient {
  _id?: string;
  company: Company | null;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
}

interface Company {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
}

interface ListItem {
  id: number;
  _id?: string;
  name?: string;
  shortName?: string;
  logo?: string;
  value: string;
}

export const Clients: React.FC = () => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState<ListItem[]>([]);
  const [apiCompanies, setApiCompanies] = useState<Company[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<ListItem>({
    id: 0,
    _id: "",
    value: "",
  });

  const [newClient, setNewClient] = useState<NewClient | null>({
    company: null,
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

  const [selectedClient, setSelectedClient] = useState<TableData | null>(null);
 
  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError("Error fetching clients");
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data: { datas: Company[] } = await getCompanies();
      const filteredData = data.datas.map((item, index) => ({
        id: index + 1,
        _id: item._id || "",
        value: item.name,
      }));
      setCompanies(filteredData);
      setApiCompanies(data.datas);
      setSelectedCompany(filteredData[0]);
      setLoading(false);
    } catch (err) {
      setError("Error fetching company");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchCompanies();
  }, []);

  // table
  const columns = [
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
    {
      header: t("company"),
      accessor: "company",
      sortable: true,
      render: (data: any) => data?.name ?? "-",
    },
  ];

  type TableData = {
    _id: string;
    email: string;
    lastname: string;
    firstname: string;
    phone: string;
    cell: string;
    title: string;
    company: string;
  };

  const keyExtractor = (item: any) => item.id;

  const handleEditClientButton = (client: TableData) => {
    const matchingCompany = apiCompanies.find(
      (company) => company.name === client.company
    );

    setNewClient({
      _id: client._id,
      email: client.email,
      lastname: client.lastname,
      firstname: client.firstname,
      phone: client.phone,
      cell: client.cell,
      title: client.title,
      company: matchingCompany
        ? {
            _id: matchingCompany._id,
            name: matchingCompany.name,
            shortName: matchingCompany.shortName,
            logo: matchingCompany.logo,
          }
        : null,
    });
    setIsOpenEditClientModal(!isOpenEditClientModal);
  };

  const handleDeleteClientButton = (client: TableData) => {
    setSelectedClient(client);
    setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
  };

  const rowActions = [
    {
      label: "Edit",
      onClick: (item: TableData) => handleEditClientButton(item),
    },
    {
      label: "Delete",
      onClick: (item: TableData) => handleDeleteClientButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    clients,
    columns
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    clients,
    columns,
    setTableData
  );

  useEffect(() => {
    const newFilteredData = clients?.filter((item) =>
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
  //

  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
  const [isOpenEditClientModal, setIsOpenEditClientModal] = useState(false);
  const [isOpenDeleteClientModal, setIsOpenDeleteClientModal] = useState(false);

  const handleCancelAddClient = () => {
    setNewClient(null);
    setIsOpenAddClientModal(!isOpenAddClientModal);
  };

  const handleSubmitAddClient = async () => {
    if (!newClient || !selectedCompany) return;

    try {
      const matchingCompany = apiCompanies.find(
        (company) => company._id === selectedCompany._id
      );

      if (!matchingCompany) {
        setError("Selected company not found");
        return;
      }

      const clientToCreate = {
        ...newClient,
        company: {
          _id: matchingCompany._id,
          name: matchingCompany.name,
          shortName: matchingCompany.shortName,
          logo: matchingCompany.logo,
        },
      };
      await createClient(clientToCreate);
    } catch (error) {
      setError("Error creating client");
      console.error("Error:", error);
    }

    setNewClient(null);
    setIsOpenAddClientModal(!isOpenAddClientModal);
  };

  const handleCancelEditClient = () => {
    setNewClient(null);
    setIsOpenEditClientModal(!isOpenEditClientModal);
  };

  const handleSubmitEditClient = async () => {
    if (!newClient || !selectedCompany) return;

    try {
      const matchingCompany = apiCompanies.find(
        (company) => company._id === selectedCompany._id
      );

      if (!matchingCompany) {
        setError("Selected company not found");
        return;
      }

      const clientToUpdate = {
        ...newClient,
        company: {
          _id: matchingCompany._id,
          name: matchingCompany.name,
          shortName: matchingCompany.shortName,
          logo: matchingCompany.logo,
        },
      };

      await updateClient(clientToUpdate);
      setNewClient(null);
      setIsOpenEditClientModal(!isOpenEditClientModal);
      fetchClients();
    } catch (error) {
      setError("Error updating client");
      console.error("Error:", error);
    }
  };

  const handleCancelDeleteClient = () => {
    setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
  };

  const handleSubmitDeleteClient = async () => {
    if (selectedClient?._id) {
      try {
        await deleteClient(selectedClient._id);
      } catch (error) {
        setError("Error deleting client");
        console.error("Error:", error);
      }
      setSelectedClient(null);
      setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
      fetchClients();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewClient((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleCompanyChange = (company: ListItem) => {
    setSelectedCompany(company);
    setNewClient((prevState) => ({
      ...prevState!,
      company: {
        id: company.id,
        _id: company._id,
        name: company.name || "",
        shortName: company.shortName || "",
        logo: company.logo || "",
      } as Company,
    }));
  };

  return (
    <>
      <Card title={t("clients")}>
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
              onClick={() => setIsOpenAddClientModal(!isOpenAddClientModal)}
            >
              {t("addClient")}
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
        title={t("addClient")}
        onCancel={handleCancelAddClient}
        onSubmit={handleSubmitAddClient}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddClientModal}
      >
        <>
          <SelectDropdown
            items={companies}
            title={t("company")}
            selected={selectedCompany}
            onChange={handleCompanyChange}
          />
          <SimpleInput
            label={t("firstname")}
            id={"firstname"}
            name={"firstname"}
            type={"text"}
            placeholder={t("firstname")}
            value={newClient?.firstname || ""}
            onChange={(value) => handleInputChange("firstname", value)}
          />
          <SimpleInput
            label={t("lastname")}
            id={"lastname"}
            name={"lastname"}
            type={"text"}
            placeholder={t("lastname")}
            value={newClient?.lastname || ""}
            onChange={(value) => handleInputChange("lastname", value)}
          />
          <SimpleInput
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={t("email")}
            value={newClient?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
          />
          <SimpleInput
            label={t("title")}
            id={"title"}
            name={"title"}
            type={"text"}
            placeholder={t("title")}
            value={newClient?.title || ""}
            onChange={(value) => handleInputChange("title", value)}
          />
          <SimpleInput
            label={t("phone")}
            id={"phone"}
            name={"phone"}
            type={"text"}
            placeholder={t("phone")}
            value={newClient?.phone || ""}
            onChange={(value) => handleInputChange("phone", value)}
          />
          <SimpleInput
            label={t("cell")}
            id={"cell"}
            name={"cell"}
            type={"text"}
            placeholder={t("cell")}
            value={newClient?.cell || ""}
            onChange={(value) => handleInputChange("cell", value)}
          />
        </>
      </Modal>
      <Modal
        title={t("editClient")}
        onCancel={handleCancelEditClient}
        onSubmit={handleSubmitEditClient}
        cancelText={t("btn.cancel")}
        submitText={t("btn.update")}
        isOpen={isOpenEditClientModal}
      >
        <>
          <SelectDropdown
            items={companies}
            title={t("company")}
            selected={selectedCompany}
            onChange={handleCompanyChange}
          />
          <SimpleInput
            label={t("firstname")}
            id={"firstname"}
            name={"firstname"}
            type={"text"}
            placeholder={t("firstname")}
            value={newClient?.firstname || ""}
            onChange={(value) => handleInputChange("firstname", value)}
          />
          <SimpleInput
            label={t("lastname")}
            id={"lastname"}
            name={"lastname"}
            type={"text"}
            placeholder={t("lastname")}
            value={newClient?.lastname || ""}
            onChange={(value) => handleInputChange("lastname", value)}
          />
          <SimpleInput
            label={t("email")}
            id={"email"}
            name={"email"}
            type={"text"}
            placeholder={t("email")}
            value={newClient?.email || ""}
            onChange={(value) => handleInputChange("email", value)}
          />
          <SimpleInput
            label={t("title")}
            id={"title"}
            name={"title"}
            type={"text"}
            placeholder={t("title")}
            value={newClient?.title || ""}
            onChange={(value) => handleInputChange("title", value)}
          />
          <SimpleInput
            label={t("phone")}
            id={"phone"}
            name={"phone"}
            type={"text"}
            placeholder={t("phone")}
            value={newClient?.phone || ""}
            onChange={(value) => handleInputChange("phone", value)}
          />
          <SimpleInput
            label={t("cell")}
            id={"cell"}
            name={"cell"}
            type={"text"}
            placeholder={t("cell")}
            value={newClient?.cell || ""}
            onChange={(value) => handleInputChange("cell", value)}
          />
        </>
      </Modal>
      <Modal
        title={t("msg.confirmSuppression")}
        onCancel={handleCancelDeleteClient}
        onSubmit={handleSubmitDeleteClient}
        cancelText={t("btn.cancel")}
        submitText={t("btn.confirm")}
        isOpen={isOpenDeleteClientModal}
      >
        <p>{t("client") + ` <<${selectedClient?.firstname} ` + `${selectedClient?.lastname}>> ` + t("msg.deleteNotice") + '!'}</p>
      </Modal>
    </>
  );
};
