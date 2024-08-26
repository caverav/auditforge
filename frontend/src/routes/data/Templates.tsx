import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import {
  createTemplate,
  deleteTemplate,
  downloadTemplate,
  getTemplates,
  updateTemplate,
} from "../../services/data";
import PrimaryButton from "../../components/button/PrimaryButton";
import Modal from "../../components/modal/Modal";
import SimpleInput from "../../components/input/SimpleInput";
import FileInput from "../../components/input/FileInput";
import UITable from "../../components/table/UITable";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";

interface NewTemplate {
  id?: string;
  name: string;
  ext: string;
  file: string;
}

export const Templates: React.FC = () => {
  const { t } = useTranslation();

  const [newTemplate, setNewTemplate] = useState<NewTemplate | null>({
    name: "",
    ext: "",
    file: "",
  });

  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<TableData | null>(
    null
  );

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError("Error fetching company");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const columns = [
    { header: t("name"), accessor: "name", sortable: true, filterable: true },
    {
      header: t("extension"),
      accessor: "ext",
      sortable: true,
      filterable: true,
    },
  ];

  type TableData = {
    _id: string;
    name: string;
    ext: string;
  };

  const keyExtractor = (item: any) => item._id;

  const handleEditTemplateButton = (template: TableData) => {
    setNewTemplate((prevState) => ({
      ...prevState!,
      _id: template._id,
    }));
    setIsOpenEditTemplateModal(true);
  };

  const handleDownloadTemplateButton = async (template: TableData) => {
    try {
      const blob = await downloadTemplate(template._id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `${template.name}.${template.ext}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      setError("Error downloading template");
    }
  };

  const handleDeleteTemplateButton = async (template: TableData) => {
    setSelectedTemplate(template);
    setIsOpenDeleteTemplateModal(!isOpenDeleteTemplateModal);
  };

  const rowActions = [
    {
      label: "Edit",
      onClick: (item: TableData) => handleEditTemplateButton(item),
    },
    {
      label: "Download",
      onClick: (item: TableData) => handleDownloadTemplateButton(item),
    },
    {
      label: "Delete",
      onClick: (item: TableData) => handleDeleteTemplateButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    templates,
    columns
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    templates,
    columns,
    setTableData
  );

  const [isOpenAddTemplateModal, setIsOpenAddTemplateModal] = useState(false);
  const [isOpenEditTemplateModal, setIsOpenEditTemplateModal] = useState(false);
  const [isOpenDeleteTemplateModal, setIsOpenDeleteTemplateModal] =
    useState(false);

  const handleCancelAddTemplate = () => {
    setNewTemplate(null);
    setIsOpenAddTemplateModal(!isOpenAddTemplateModal);
  };

  const handleSubmitAddTemplate = async () => {
    try {
      await createTemplate(newTemplate!);
    } catch (error) {
      setError("Error creating company");
      console.error("Error:", error);
    }
    setNewTemplate(null);
    setIsOpenAddTemplateModal(!isOpenAddTemplateModal);
    fetchTemplates();
  };

  const handleCancelEditTemplate = () => {
    setNewTemplate(null);
    setIsOpenEditTemplateModal(!isOpenEditTemplateModal);
  };

  const handleSubmitEditTemplate = async () => {
    try {
      await updateTemplate(newTemplate!);
    } catch (error) {
      setError("Error updating template");
      console.error("Error:", error);
    }
    setNewTemplate(null);
    setIsOpenEditTemplateModal(!isOpenEditTemplateModal);
    fetchTemplates();
  };

  const handleCancelDeleteTemplate = () => {
    setIsOpenDeleteTemplateModal(!isOpenDeleteTemplateModal);
  };

  const handleSubmitDeleteTemplate = async () => {
    if (selectedTemplate?._id) {
      try {
        await deleteTemplate(selectedTemplate._id);
      } catch (error) {
        setError("Error deleting template");
        console.error("Error:", error);
      }
      setSelectedTemplate(null);
      setIsOpenDeleteTemplateModal(!isOpenDeleteTemplateModal);
      fetchTemplates();
    }
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
          <div className="flex justify-end mb-2 mr-2">
            <PrimaryButton
              onClick={() => setIsOpenAddTemplateModal(!isOpenAddTemplateModal)}
            >
              {t("createTemplate")}
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
        title={t("createTemplate")}
        onCancel={handleCancelAddTemplate}
        onSubmit={handleSubmitAddTemplate}
        cancelText={t("btn.cancel")}
        submitText={t("btn.create")}
        isOpen={isOpenAddTemplateModal}
      >
        <>
          <SimpleInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            placeholder={t("name")}
            value={newTemplate?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <FileInput
            id="template"
            name="template"
            onFileSelect={(file) =>
              handleFileSelect(file.name.split(".").pop() || "", file.content)
            }
          />
        </>
      </Modal>
      <Modal
        title={t("editTemplate")}
        onCancel={handleCancelEditTemplate}
        onSubmit={handleSubmitEditTemplate}
        cancelText={t("btn.cancel")}
        submitText={t("btn.update")}
        isOpen={isOpenEditTemplateModal}
      >
        <>
          <SimpleInput
            label={t("name")}
            id="name"
            name="name"
            type="text"
            placeholder={t("name")}
            value={newTemplate?.name || ""}
            onChange={(value) => handleInputChange("name", value)}
          />
          <FileInput
            id="template"
            name="template"
            onFileSelect={(file) =>
              handleFileSelect(file.name.split(".").pop() || "", file.content)
            }
          />
        </>
      </Modal>
      <Modal
        title={t("msg.confirmSuppression")}
        onCancel={handleCancelDeleteTemplate}
        onSubmit={handleSubmitDeleteTemplate}
        cancelText={t("btn.cancel")}
        submitText={t("btn.confirm")}
        isOpen={isOpenDeleteTemplateModal}
      >
        <p>
          {t("template") +
            ` <<${selectedTemplate?.name}>> ` +
            t("msg.deleteNotice") +
            "!"}
        </p>
      </Modal>
    </>
  );
};
