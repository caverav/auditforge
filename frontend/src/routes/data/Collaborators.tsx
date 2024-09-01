import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import { createCollaborator, getCollaborators } from '../../services/data';

type NewCollaborator = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
};

// Estos roles deberían venir del backend.
const rolesOptions = [
  { id: 1, value: 'user' },
  { id: 2, value: 'admin' },
  { id: 3, value: 'report' },
];

export const Collaborators: React.FC = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState(rolesOptions);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const [newCollaborator, setNewCollaborator] =
    useState<NewCollaborator | null>({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      phone: '',
      role: selectedRole.value,
      totpenabled: false,
      username: '',
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
        setError('Error fetching collaborators');
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
      setError('Error creating collaborator');
      console.error('Error:', error);
    }
    setNewCollaborator(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCollaborator(prevState => ({
      ...prevState!,
      [name]: value,
    }));
  };

  return (
    <>
      <Card title={t('collaborators')}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t('addCollaborator')}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? 'cargandooo' : JSON.stringify(collaborators)}</div>
        </>
      </Card>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddCollabModal}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        submitText={t('btn.create')}
        title={t('addCollaborator')}
      >
        <>
          <SimpleInput
            id="username"
            label={t('username')}
            name="username"
            onChange={value => handleInputChange('username', value)}
            placeholder={t('username')}
            type="text"
            value={newCollaborator?.username || ''}
          />
          <SimpleInput
            id="firstname"
            label={t('firstname')}
            name="firstname"
            onChange={value => handleInputChange('firstname', value)}
            placeholder={t('firstname')}
            type="text"
            value={newCollaborator?.firstname || ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            type="text"
            value={newCollaborator?.lastname || ''}
          />
          <SimpleInput
            id="password"
            label={t('password')}
            name="password"
            onChange={value => handleInputChange('password', value)}
            placeholder={t('password')}
            type="text"
            value={newCollaborator?.password || ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newCollaborator?.phone || ''}
          />
          <SelectDropdown
            items={roles}
            onChange={setSelectedRole}
            selected={selectedRole}
            title={t('role')}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newCollaborator?.email || ''}
          />
        </>
      </Modal>
    </>
  );
};
