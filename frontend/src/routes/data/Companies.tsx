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
import { useTableFiltering } from "../../hooks/useTableFiltering";

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

  const [selectedCompany, setSelectedCompany] = useState<TableData | null>(
    null
  );

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

  const columns = [
    { header: t("name"), accessor: "name", sortable: true, filterable: true },
    { header: t("shortName"), accessor: "shortName", sortable: true },
    {
      header: t("logo"),
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
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);
  };

  const handleDeleteCompanyButton = (company: TableData) => {
    setSelectedCompany(company);
    setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
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

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    companies,
    columns,
    setTableData
  );

  const [isOpenAddCompaniesModal, setIsOpenAddCompaniesModal] = useState(false);
  const [isOpenEditCompaniesModal, setIsOpenEditCompaniesModal] =
    useState(false);
  const [isOpenDeleteCompanyModal, setIsOpenDeleteCompanyModal] =
    useState(false);

  const handleCancelAddCompanies = () => {
    setNewCompany(null);
    setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);
  };

  const handleSubmitAddCompanies = async () => {
    try {
      await createCompany(newCompany!);
    } catch (error) {
      setError("Error creating company");
      console.error("Error:", error);
    }
    setNewCompany(null);
    setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);
    fetchCompanies();
  };

  const handleCancelEditCompanies = () => {
    setNewCompany(null);
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);
  };

  const handleSubmitEditCompanies = async () => {
    try {
      await updateCompany(newCompany!);
    } catch (error) {
      setError("Error updating company");
      console.error("Error:", error);
    }
    setNewCompany(null);
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);
    fetchCompanies();
  };

  const handleCancelDeleteCompany = () => {
    setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
  };

  const handleSubmitDeleteCompany = async () => {
    if (selectedCompany?._id) {
      try {
        await deleteCompany(selectedCompany._id);
      } catch (error) {
        setError("Error deleting company");
        console.error("Error:", error);
      }
      setSelectedCompany(null);
      setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
      fetchCompanies();
    }
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
          <div className="flex justify-end mb-2 mr-2">
            <PrimaryButton
              onClick={() =>
                setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal)
              }
            >
              {t("addCompany")}
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
          />
        </>
      </Card>
      <Modal
        title={t("addCompany")}
        onCancel={handleCancelAddCompanies}
        onSubmit={handleSubmitAddCompanies}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddCompaniesModal}
      >
        <>
          <SimpleInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            placeholder={t("name")}
            value={newCompany?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <SimpleInput
            label={t("shortName")}
            id="shortname"
            name="shortname"
            type="text"
            placeholder={t("shortName")}
            value={newCompany?.shortName || ""}
            onChange={(value) => handleInputChange("shortName", value)}
          />
          <ImageInput
            label={t("logo")}
            id="logo"
            name="logo"
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
      <Modal
        title={t("editCompany")}
        onCancel={handleCancelEditCompanies}
        onSubmit={handleSubmitEditCompanies}
        cancelText={t("btn.cancel")}
        submitText={t("btn.update")}
        isOpen={isOpenEditCompaniesModal}
      >
        <>
          <SimpleInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            placeholder={t("name")}
            value={newCompany?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <SimpleInput
            label={t("shortName")}
            id="shortname"
            name="shortname"
            type="text"
            placeholder={t("shortName")}
            value={newCompany?.shortName || ""}
            onChange={(value) => handleInputChange("shortName", value)}
          />
          <ImageInput
            label={t("logo")}
            id="logo"
            name="logo"
            onImageSelect={handleImageSelect}
            initialImage={newCompany?.logo || ""}
          />
        </>
      </Modal>
      <Modal
        title={t("msg.confirmSuppression")}
        onCancel={handleCancelDeleteCompany}
        onSubmit={handleSubmitDeleteCompany}
        cancelText={t("btn.cancel")}
        submitText={t("btn.confirm")}
        isOpen={isOpenDeleteCompanyModal}
      >
        <p>
          {t("company") +
            ` <<${selectedCompany?.name}>> ` +
            t("msg.deleteNotice") +
            "!"}
        </p>
      </Modal>
    </>
  );
};
