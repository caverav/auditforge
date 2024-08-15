import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import ImageInput from "../../components/input/ImageInput";
import UITable from "../../components/table/UITable";
import { useSortableTable } from "../../hooks/useSortableTable";

interface NewCompany {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
}

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  const [newCompany, setNewCompany] = useState<NewCompany | null>({
    name: "",
    shortName: "",
    logo: "",
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError("Error fetching company");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // table
  const columns = [
    { header: "Name", accessor: "name", sortable: true, filterable: true },
    { header: "Shortname", accessor: "shortName", sortable: true },
    {
      header: "Logo",
      accessor: "logo",
      sortable: false,
      render: (logo: string) => (
        <img
          src={`${logo}`}
          alt="Company Logo"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      ),
    },
  ];

  type TableData = {
    _id: string;
    name: string;
    shortName: string;
    logo: string;
  };

  const keyExtractor = (item: any) => item.id;

  const handleEditCompanyButton = (company: TableData) => {
    setNewCompany({
      _id: company._id,
      name: company.name,
      shortName: company.shortName,
      logo: company.logo,
    });
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };

  const handleDeleteCompanyButton = (company: TableData) => {
    deleteCompany(company._id);
    fetchCompanies();
  };

  const rowActions = [
    {
      label: "Edit",
      onClick: (item: TableData) => handleEditCompanyButton(item),
    },
    {
      label: "Delete",
      onClick: (item: TableData) => handleDeleteCompanyButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    companies,
    columns
  );

  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (accessor: string, value: string) => {
    const newFilters = { ...filters, [accessor]: value };
    setFilters(newFilters);
  };

  useEffect(() => {
    const newFilteredData = companies?.filter((item) =>
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
  // end table

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);
  const [isOpenEditCollabModal, setIsOpenEditCollabModal] = useState(false);

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
    fetchCompanies();
  };

  const handleCancelEditCollab = () => {
    setNewCompany(null);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };

  const handleSubmitEditCollab = async () => {
    try {
      await updateCompany(newCompany!);
    } catch (error) {
      setError("Error updating company");
      console.error("Error:", error);
    }
    setNewCompany(null);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
    fetchCompanies();
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
            value={newCompany?.shortName || ""}
            onChange={(value) => handleInputChange("shortName", value)}
          />
          <ImageInput
            label={t("logo")}
            id={"logo"}
            name={"logo"}
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
      <Modal
        title={t("editCompany")}
        onCancel={handleCancelEditCollab}
        onSubmit={handleSubmitEditCollab}
        cancelText={t("btn.cancel")}
        submitText={t("btn.update")}
        isOpen={isOpenEditCollabModal}
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
            value={newCompany?.shortName || ""}
            onChange={(value) => handleInputChange("shortName", value)}
          />
          <ImageInput
            label={t("logo")}
            id={"logo"}
            name={"logo"}
            onImageSelect={handleImageSelect}
            initialImage={newCompany?.logo || ""}
          />
        </>
      </Modal>
    </>
  );
};
