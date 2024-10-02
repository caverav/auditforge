import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import PrimarySwitch from '../../components/switch/PrimarySwitch';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import {
  createCollaborator,
  getCollaborators,
  getRoles,
  updateCollaborator,
} from '../../services/data';

type NewCollaborator = {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  role: string;
  totpenabled: boolean;
  username: string;
  enabled?: boolean;
  [key: string]: string | number | boolean | undefined;
};

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

type RoleOption = {
  id: number;
  value: string;
};

export const Collaborators: React.FC = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [enabledFilter, setEnabledFilter] = useState<boolean>(true);

  const [addModalUsernameRequiredAlert, setAddModalUsernameRequiredAlert] =
    useState<boolean>(false);
  const [addModalFirstnameRequiredAlert, setAddModalFirstnameRequiredAlert] =
    useState<boolean>(false);
  const [addModalLastnameRequiredAlert, setAddModalLastnameRequiredAlert] =
    useState<boolean>(false);
  const [addModalRoleRequiredAlert, setAddModalRoleRequiredAlert] =
    useState<boolean>(false);
  const [addModalPasswordRequiredAlert, setAddModalPasswordRequiredAlert] =
    useState<boolean>(false);
  const [
    addModalConfirmPasswordRequiredAlert,
    setAddModalConfirmPasswordRequiredAlert,
  ] = useState<boolean>(false);

  const [editModalUsernameRequiredAlert, setEditModalUsernameRequiredAlert] =
    useState<boolean>(false);
  const [editModalFirstnameRequiredAlert, setEditModalFirstnameRequiredAlert] =
    useState<boolean>(false);
  const [editModalLastnameRequiredAlert, setEditModalLastnameRequiredAlert] =
    useState<boolean>(false);
  const [editModalRoleRequiredAlert, setEditModalRoleRequiredAlert] =
    useState<boolean>(false);
  const [editModalPasswordRequiredAlert, setEditModalPasswordRequiredAlert] =
    useState<boolean>(false);
  const [
    editModalConfirmPasswordRequiredAlert,
    setEditModalConfirmPasswordRequiredAlert,
  ] = useState<boolean>(false);

  const initialCollaboratorState = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: selectedRole ? selectedRole.value : '',
    totpenabled: false,
    username: '',
  };

  const [newCollaborator, setNewCollaborator] =
    useState<NewCollaborator | null>(initialCollaboratorState);

  const [collaborators, setCollaborators] = useState<NewCollaborator[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);

  const columns = useMemo(
    () => [
      {
        header: t('username'),
        accessor: 'username',
        sortable: true,
        filterable: true,
      },
      {
        header: t('firstname'),
        accessor: 'firstname',
        sortable: true,
        filterable: true,
      },
      {
        header: t('lastname'),
        accessor: 'lastname',
        sortable: true,
        filterable: true,
      },
      {
        header: t('email'),
        accessor: 'email',
        sortable: true,
        filterable: true,
      },
      { header: t('role'), accessor: 'role', sortable: true, filterable: true },
    ],
    [t],
  );

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    collaborators,
    columns,
  );

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);
  const [isOpenEditCollabModal, setIsOpenEditCollabModal] = useState(false);

  const fetchCollaborators = useCallback(async () => {
    try {
      const data = await getCollaborators();
      setCollaborators(data.datas);

      const filteredData = data.datas.filter(
        (item: TableData) => item.enabled === enabledFilter,
      );

      setTableData(filteredData);
      setLoading(false);
    } catch (err) {
      setError('Error fetching collaborators');
      setLoading(false);
    }
  }, [enabledFilter, setTableData]);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      const rolesOptions: RoleOption[] = data.datas.map(
        (role: string, index: number) => ({
          id: index + 1,
          value: role,
        }),
      );
      setRoles(rolesOptions);
      setSelectedRole(rolesOptions[0]);
      setLoading(false);
    } catch (err) {
      setError('Error fetching roles');
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCollaborators();
    void fetchRoles();
  }, [fetchCollaborators]);

  const keyExtractor = (item: TableData) => item._id ?? '';

  const handleEditCollaboratorButton = (collaborator: TableData) => {
    const role = roles.find(r => r.value === collaborator.role) ?? null;
    setSelectedRole(role);

    setNewCollaborator({
      ...collaborator,
      enabled: collaborator.enabled ?? false,
    });
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => handleEditCollaboratorButton(item),
    },
  ];

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    collaborators,
    columns,
    setTableData,
  );

  useEffect(() => {
    const newFilteredData = collaborators.filter(item => {
      const matchesEnabled = item.enabled === enabledFilter;
      return (
        matchesEnabled &&
        columns.every(column => {
          const filterValue = filters[column.accessor];
          if (!filterValue) {
            return true;
          }
          return String(item[column.accessor])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        })
      );
    });
    setTableData(newFilteredData);
  }, [filters, enabledFilter, columns, collaborators, setTableData]);

  const handleCancelAddCollab = () => {
    setNewCollaborator(initialCollaboratorState);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);

    setAddModalUsernameRequiredAlert(false);
    setAddModalFirstnameRequiredAlert(false);
    setAddModalLastnameRequiredAlert(false);
    setAddModalRoleRequiredAlert(false);
    setAddModalPasswordRequiredAlert(false);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return passwordRegex.test(password);
  };

  const handleSubmitAddCollab = async () => {
    if (!newCollaborator) {
      return;
    }

    const updatedCollaborator: NewCollaborator = {
      ...newCollaborator,
      role: selectedRole?.value ?? '',
    };

    let isValid = true;

    if (
      !updatedCollaborator.username ||
      updatedCollaborator.username.trim() === ''
    ) {
      setAddModalUsernameRequiredAlert(true);
      isValid = false;
    }

    if (
      !updatedCollaborator.firstname ||
      updatedCollaborator.firstname.trim() === ''
    ) {
      setAddModalFirstnameRequiredAlert(true);
      isValid = false;
    }

    if (
      !updatedCollaborator.lastname ||
      updatedCollaborator.lastname.trim() === ''
    ) {
      setAddModalLastnameRequiredAlert(true);
      isValid = false;
    }

    if (
      !updatedCollaborator.password ||
      updatedCollaborator.password.trim() === ''
    ) {
      setAddModalPasswordRequiredAlert(true);
      isValid = false;
    }

    if (!updatedCollaborator.confirmPassword) {
      setAddModalConfirmPasswordRequiredAlert(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('msg.fieldRequired'));
      return;
    }

    if (!validatePassword(updatedCollaborator.password)) {
      toast.error(t('msg.passwordComplexity'));
      return;
    }

    if (updatedCollaborator.password != updatedCollaborator.confirmPassword) {
      toast.error(t('msg.passwordsDoNotMatch'));
      return;
    }

    try {
      await createCollaborator(updatedCollaborator);
      toast.success(t('msg.collaboratorCreatedOk'));
      setIsOpenAddCollabModal(!isOpenAddCollabModal);

      setNewCollaborator(initialCollaboratorState);
      void fetchCollaborators();
    } catch (error) {
      toast.error(t('msg.collaboratorUsernameError'));
      setError('Error creating collaborator');
      console.error('Error:', error);
    }
  };

  const handleCancelEditCollab = () => {
    setNewCollaborator(initialCollaboratorState);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);

    setEditModalUsernameRequiredAlert(false);
    setEditModalFirstnameRequiredAlert(false);
    setEditModalLastnameRequiredAlert(false);
    setEditModalRoleRequiredAlert(false);
    setEditModalPasswordRequiredAlert(false);
  };

  const handleSubmitEditCollab = async () => {
    if (!newCollaborator) {
      return;
    }
    let isValid = true;

    if (!newCollaborator.username || newCollaborator.username.trim() === '') {
      setEditModalUsernameRequiredAlert(true);
      isValid = false;
    }

    if (!newCollaborator.firstname || newCollaborator.firstname.trim() === '') {
      setEditModalFirstnameRequiredAlert(true);
      isValid = false;
    }

    if (!newCollaborator.lastname || newCollaborator.lastname.trim() === '') {
      setEditModalLastnameRequiredAlert(true);
      isValid = false;
    }

    if (!newCollaborator.password || newCollaborator.password.trim() === '') {
      setEditModalPasswordRequiredAlert(true);
      isValid = false;
    }

    if (!newCollaborator.confirmPassword) {
      setEditModalConfirmPasswordRequiredAlert(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('msg.fieldRequired'));
      return;
    }

    if (
      newCollaborator.password &&
      !validatePassword(newCollaborator.password)
    ) {
      toast.error(t('msg.passwordComplexity'));
      return;
    }

    if (newCollaborator.password != newCollaborator.confirmPassword) {
      toast.error(t('msg.passwordsDoNotMatch'));
      return;
    }

    try {
      await updateCollaborator(newCollaborator);
      toast.success(t('msg.collaboratorUpdatedOk'));
      setIsOpenEditCollabModal(!isOpenEditCollabModal);

      setNewCollaborator(initialCollaboratorState);
      void fetchCollaborators();
    } catch (error) {
      toast.error(t('msg.collaboratorUsernameError'));
      setError('Error updating collaborator');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCollaborator(prevState => {
      if (!prevState) {
        return null;
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleRoleChange = (role: RoleOption) => {
    setSelectedRole(role);
    setNewCollaborator(prevState => {
      if (!prevState) {
        return null;
      } else {
        return {
          ...prevState,
          role: role.value,
        };
      }
    });
  };

  return (
    <>
      <Card title={t('collaborators')}>
        <>
          <div className="flex justify-between mb-2 mr-2">
            <div className="flex items-center ml-2">
              <PrimarySwitch
                enabled={enabledFilter}
                onChange={() => setEnabledFilter(!enabledFilter)}
              />
              <span className="ml-2">
                {enabledFilter
                  ? t('btn.accountsEnabled')
                  : t('btn.accountsDisabled')}
              </span>
            </div>
            <PrimaryButton
              onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
            >
              {t('addCollaborator')}
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
            requiredAlert={addModalUsernameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.username ?? ''}
          />
          <SimpleInput
            id="firstname"
            label={t('firstname')}
            name="firstname"
            onChange={value => handleInputChange('firstname', value)}
            placeholder={t('firstname')}
            requiredAlert={addModalFirstnameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.firstname ?? ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            requiredAlert={addModalLastnameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.lastname ?? ''}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newCollaborator?.email ?? ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newCollaborator?.phone ?? ''}
          />
          <SelectDropdown
            items={roles}
            onChange={handleRoleChange}
            requiredAlert={addModalRoleRequiredAlert}
            requiredField
            selected={selectedRole}
            title={t('role')}
          />
          <SimpleInput
            id="password"
            label={t('password')}
            name="password"
            onChange={value => handleInputChange('password', value)}
            placeholder={t('password')}
            requiredAlert={addModalPasswordRequiredAlert}
            requiredField
            type="password"
            value={newCollaborator?.password ?? ''}
          />
          <SimpleInput
            id="confirmPassword"
            label={t('confirmPassword')}
            name="confirmPassword"
            onChange={value => handleInputChange('confirmPassword', value)}
            placeholder={t('password')}
            requiredAlert={addModalConfirmPasswordRequiredAlert}
            requiredField
            type="password"
            value={newCollaborator?.confirmPassword ?? ''}
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenEditCollabModal}
        onCancel={handleCancelEditCollab}
        onSubmit={handleSubmitEditCollab}
        submitText={t('btn.update')}
        title={t('editCollaborator')}
      >
        <>
          <SimpleInput
            id="username"
            label={t('username')}
            name="username"
            onChange={value => handleInputChange('username', value)}
            placeholder={t('username')}
            requiredAlert={editModalUsernameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.username ?? ''}
          />
          <SimpleInput
            id="firstname"
            label={t('firstname')}
            name="firstname"
            onChange={value => handleInputChange('firstname', value)}
            placeholder={t('firstname')}
            requiredAlert={editModalFirstnameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.firstname ?? ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            requiredAlert={editModalLastnameRequiredAlert}
            requiredField
            type="text"
            value={newCollaborator?.lastname ?? ''}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newCollaborator?.email ?? ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newCollaborator?.phone ?? ''}
          />
          <SelectDropdown
            items={roles}
            onChange={handleRoleChange}
            requiredAlert={editModalRoleRequiredAlert}
            requiredField
            selected={selectedRole}
            title={t('role')}
          />
          <SimpleInput
            id="password"
            label={t('password')}
            name="password"
            onChange={value => handleInputChange('password', value)}
            placeholder={t('password')}
            requiredAlert={editModalPasswordRequiredAlert}
            requiredField
            type="password"
            value={newCollaborator?.password ?? ''}
          />
          <SimpleInput
            id="confirmPassword"
            label={t('confirmPassword')}
            name="confirmPassword"
            onChange={value => handleInputChange('confirmPassword', value)}
            placeholder={t('password')}
            requiredAlert={editModalConfirmPasswordRequiredAlert}
            requiredField
            type="password"
            value={newCollaborator?.confirmPassword ?? ''}
          />
          <div className="flex items-center mt-2">
            <PrimarySwitch
              enabled={!!newCollaborator?.enabled}
              onChange={() =>
                setNewCollaborator(prevState =>
                  prevState
                    ? { ...prevState, enabled: !prevState.enabled }
                    : null,
                )
              }
            />
            <span className="ml-2">
              {newCollaborator?.enabled
                ? t('btn.accountEnabled')
                : t('btn.accountDisabled')}
            </span>
          </div>
        </>
      </Modal>
    </>
  );
};
