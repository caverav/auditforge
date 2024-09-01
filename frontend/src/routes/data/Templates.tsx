import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import FileInput from '../../components/input/FileInput';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import { createTemplates, getTemplates } from '../../services/data';

type NewTemplate = {
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

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching company');
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
      setError('Error creating company');
      console.error('Error:', error);
    }
    setNewTemplate(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
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
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t('createTemplate')}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? 'cargandooo' : JSON.stringify(templates)}</div>
        </>
      </Card>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddCollabModal}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
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
    </>
  );
};
