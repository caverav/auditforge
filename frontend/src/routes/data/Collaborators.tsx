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

  const [newCollaborator, setNewCollaborator] =
    useState<NewCollaborator | null>(
      selectedRole
        ? {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            phone: '',
            role: selectedRole.value,
            totpenabled: false,
            username: '',
          }
        : null,
    );

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

  const keyExtractor = (item: TableData) => item._id ?? '';

  const handleEditCompanyButton = (collaborator: TableData) => {
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
      onClick: (item: TableData) => handleEditCompanyButton(item),
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
          return String(item[column.accessor as keyof TableData])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        })
      );
    });
    setTableData(newFilteredData);
  }, [filters, enabledFilter, columns, collaborators, setTableData]);

  const handleCancelAddCollab = () => {
    setNewCollaborator(null);
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

    if (!updatedCollaborator.username) {
      setAddModalUsernameRequiredAlert(true);
      isValid = false;
    }

    if (!updatedCollaborator.firstname) {
      setAddModalFirstnameRequiredAlert(true);
      isValid = false;
    }

    if (!updatedCollaborator.lastname) {
      setAddModalLastnameRequiredAlert(true);
      isValid = false;
    }

    if (!updatedCollaborator.password) {
      setAddModalPasswordRequiredAlert(true);
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

    try {
      await createCollaborator(updatedCollaborator);
      toast.success(t('msg.collaboratorCreatedOk'));
      setIsOpenAddCollabModal(!isOpenAddCollabModal);

      setNewCollaborator(null);
      void fetchCollaborators();
    } catch (error) {
      toast.error(t('msg.collaboratorUsernameError'));
      setError('Error creating collaborator');
      console.error('Error:', error);
    }
  };

  const handleCancelEditCollab = () => {
    setNewCollaborator(null);
    setIsOpenEditCollabModal(!isOpenEditCollabModal);
  };

  const handleSubmitEditCollab = async () => {
    if (!newCollaborator) {
      return;
    }

    if (
      newCollaborator.password &&
      !validatePassword(newCollaborator.password)
    ) {
      toast.error(t('msg.passwordComplexity'));
      return;
    }

    try {
      await updateCollaborator(newCollaborator);
      toast.success(t('msg.collaboratorUpdatedOk'));
      setIsOpenEditCollabModal(!isOpenEditCollabModal);

      setNewCollaborator(null);
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
            requiredField={true}
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
            requiredField={true}
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
            requiredField={true}
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
            requiredField={true}
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
            requiredField={true}
            type="password"
            value={newCollaborator?.password ?? ''}
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
            type="text"
            value={newCollaborator?.username ?? ''}
          />
          <SimpleInput
            id="firstname"
            label={t('firstname')}
            name="firstname"
            onChange={value => handleInputChange('firstname', value)}
            placeholder={t('firstname')}
            type="text"
            value={newCollaborator?.firstname ?? ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
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
            selected={selectedRole}
            title={t('role')}
          />
          <SimpleInput
            id="password"
            label={t('password')}
            name="password"
            onChange={value => handleInputChange('password', value)}
            placeholder={t('password')}
            type="password"
            value={newCollaborator?.password ?? ''}
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
