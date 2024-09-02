import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import FileInput from '../../components/input/FileInput';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import {
  createTemplate,
  deleteTemplate,
  downloadTemplate,
  getTemplates,
  updateTemplate,
} from '../../services/data';

type NewTemplate = {
  id?: string;
  name: string;
  ext: string;
  file: string;
};

export const Templates: React.FC = () => {
  const { t } = useTranslation();

  const [newTemplate, setNewTemplate] = useState<NewTemplate | null>({
    name: '',
    ext: '',
    file: '',
  });

  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<TableData | null>(
    null,
  );

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError('Error fetching company');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const columns = [
    { header: t('name'), accessor: 'name', sortable: true, filterable: true },
    {
      header: t('extension'),
      accessor: 'ext',
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
    setNewTemplate(prevState => ({
      ...prevState!,
      _id: template._id,
    }));
    setIsOpenEditTemplateModal(true);
  };

  const handleDownloadTemplateButton = async (template: TableData) => {
    try {
      const blob = await downloadTemplate(template._id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      link.download = `${template.name}.${template.ext}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      setError('Error downloading template');
    }
  };

  const handleDeleteTemplateButton = async (template: TableData) => {
    setSelectedTemplate(template);
    setIsOpenDeleteTemplateModal(!isOpenDeleteTemplateModal);
  };

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => handleEditTemplateButton(item),
    },
    {
      label: 'Download',
      onClick: (item: TableData) => handleDownloadTemplateButton(item),
    },
    {
      label: 'Delete',
      onClick: (item: TableData) => handleDeleteTemplateButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    templates,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    templates,
    columns,
    setTableData,
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
      toast.success(t('msg.templateCreatedOk'));
    } catch (error) {
      setError('Error creating company');
      console.error('Error:', error);
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
      toast.success(t('msg.templateUpdatedOk'));
    } catch (error) {
      setError('Error updating template');
      console.error('Error:', error);
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
        toast.success(t('msg.templateDeletedOk'));
      } catch (error) {
        setError('Error deleting template');
        console.error('Error:', error);
      }
      setSelectedTemplate(null);
      setIsOpenDeleteTemplateModal(!isOpenDeleteTemplateModal);
      fetchTemplates();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewTemplate(prevState => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleFileSelect = (ext: string, content: string) => {
    setNewTemplate(prevState => ({
      ...prevState!,
      ext,
      file: content,
    }));
  };

  return (
    <>
      <Card title={t('templates')}>
        <>
          <div className="flex justify-end mb-2 mr-2">
            <PrimaryButton
              onClick={() => setIsOpenAddTemplateModal(!isOpenAddTemplateModal)}
            >
              {t('createTemplate')}
            </PrimaryButton>
          </div>
          <UITable
            columns={columns}
            data={tableData}
            emptyState={<div>{t('err.noMatchingRecords')}</div>}
            filters={filters}
            keyExtractor={keyExtractor}
            onFilter={handleFilterChange}
            onSort={handleSorting}
            rowActions={rowActions}
          />
        </>
      </Card>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddTemplateModal}
        onCancel={handleCancelAddTemplate}
        onSubmit={handleSubmitAddTemplate}
        submitText={t('btn.create')}
        title={t('createTemplate')}
      >
        <>
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={value => handleInputChange('name', value)}
            placeholder={t('name')}
            type="text"
            value={newTemplate?.name || ''}
          />
          <FileInput
            id="template"
            name="template"
            onFileSelect={file =>
              handleFileSelect(file.name.split('.').pop() || '', file.content)
            }
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenEditTemplateModal}
        onCancel={handleCancelEditTemplate}
        onSubmit={handleSubmitEditTemplate}
        submitText={t('btn.update')}
        title={t('editTemplate')}
      >
        <>
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={value => handleInputChange('name', value)}
            placeholder={t('name')}
            type="text"
            value={newTemplate?.name || ''}
          />
          <FileInput
            id="template"
            name="template"
            onFileSelect={file =>
              handleFileSelect(file.name.split('.').pop() || '', file.content)
            }
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenDeleteTemplateModal}
        onCancel={handleCancelDeleteTemplate}
        onSubmit={handleSubmitDeleteTemplate}
        submitText={t('btn.confirm')}
        title={t('msg.confirmSuppression')}
      >
        <p>
          {t('template') +
            ` <<${selectedTemplate?.name}>> ` +
            t('msg.deleteNotice') +
            '!'}
        </p>
      </Modal>
    </>
  );
};
