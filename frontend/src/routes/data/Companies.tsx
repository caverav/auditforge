import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import ImageInput from '../../components/input/ImageInput';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import { createCompany, getCompanies } from '../../services/data';

type NewCompany = {
  name: string;
  shortname: string;
  logo: string;
};

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  const [newCompany, setNewCompany] = useState<NewCompany | null>({
    name: '',
    shortname: '',
    logo: '',
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching company');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCancelAddCollab = () => {
    setNewCompany(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createCompany(newCompany!);
    } catch (error) {
      setError('Error creating company');
      console.error('Error:', error);
    }
    setNewCompany(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCompany(prevState => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleImageSelect = (base64String: string) => {
    setNewCompany(prevState => ({
      ...prevState!,
      logo: base64String,
    }));
  };

  return (
    <>
      <Card title={t('companies')}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t('addCompany')}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? 'cargandooo' : JSON.stringify(companies)}</div>
        </>
      </Card>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddCollabModal}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        submitText={t('btn.create')}
        title={t('addCompany')}
      >
        <>
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={value => handleInputChange('name', value)}
            placeholder={t('name')}
            type="text"
            value={newCompany?.name || ''}
          />
          <SimpleInput
            id="shortname"
            label={t('shortName')}
            name="shortname"
            onChange={value => handleInputChange('shortname', value)}
            placeholder={t('shortName')}
            type="text"
            value={newCompany?.shortname || ''}
          />
          <ImageInput
            id="logo"
            label={t('logo')}
            name="logo"
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
    </>
  );
};
