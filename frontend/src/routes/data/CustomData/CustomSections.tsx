import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../../components/button/PrimaryButton';
import EditCard from '../../../components/card/EditCard';
import SimpleInput from '../../../components/input/SimpleInput';
import {
  createCustomSection,
  getCustomSections,
  updateCustomSection,
} from '../../../services/data';
import SectionList from './SectionList';

export const CustomSections: React.FC = () => {
  const { t } = useTranslation();
  const [newSection, setNewSection] = useState('');
  const [newField, setNewField] = useState('');
  const [newIcon, setNewIcon] = useState('');

  const [sections, setSections] = useState<
    { name: string; field: string; icon?: string }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getCustomSections();
        setSections(data.datas);
        setLoading(false);
      } catch (err) {
        setError('Error fetching company');
        setLoading(false);
      }
    };

    void fetchSections();
  }, [isEditing]);

  const handleAddSection = async () => {
    let resp: {
      datas: { name: string; field: string; icon?: string };
      status?: string;
    };

    try {
      resp = await createCustomSection({
        name: newSection,
        field: newField,
        icon: newIcon,
      });
    } catch (error) {
      setError('Error creating section');
      toast.error(t('err.errorCreatingSection'));
      setNewSection('');
      setNewField('');
      setNewIcon('');
      return;
    }
    toast.success(t('msg.sectionCreatedOk'));
    setNewSection('');
    setNewField('');
    setNewIcon('');
    setSections(prevSections => [
      ...prevSections,
      { icon: resp.datas.icon, field: resp.datas.field, name: resp.datas.name },
    ]);
  };

  /**
   * Lógica para hacer uptdate (PUT)
   * de los lenguajes.
   */
  const [newSectionList, setNewSectionList] = useState<
    { name: string; field: string; icon?: string }[]
  >([]);

  const handleUpdateSectionList = useCallback(
    (data: { name: string; field: string; icon: string }[]) => {
      setNewSectionList(data);
    },
    [setNewSectionList],
  );

  const onClickSave = async () => {
    try {
      await updateCustomSection(newSectionList);
      setIsEditing(false);
    } catch (error) {
      setError('Error updating sections');
      return;
    }
  };

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* TODO: Alinear bien los inputs */}
        <SimpleInput
          id="name"
          label={t('name')}
          name="name"
          onChange={setNewSection}
          placeholder={t('name')}
          type="text"
          value={newSection}
        />
        <SimpleInput
          id="field"
          label={t('field')}
          name="field"
          onChange={setNewField}
          placeholder={t('field')}
          type="text"
          value={newField}
        />
        <SimpleInput
          id="icon"
          label={t('customIcon')}
          name="icon"
          onChange={setNewIcon}
          placeholder={t('customIcon')}
          type="text"
          value={newIcon}
        />
        {newIcon.startsWith('fa-') ? (
          <i className={`fa ${newIcon}`} />
        ) : (
          <i className="material-icons">{newIcon}</i>
        )}

        <div className="mt-4 mx-auto">
          <PrimaryButton onClick={handleAddSection}>
            {t('btn.create')}
          </PrimaryButton>
        </div>
      </div>
      <EditCard
        editTitle={t('tooltip.edit')}
        isEditing={isEditing}
        onClickCancel={() => setIsEditing(false)}
        onClickEdit={() => setIsEditing(true)}
        onClickSave={onClickSave}
        title={t('listOfSections')}
      >
        {loading ? (
          <p>{t('loading')}</p>
        ) : (
          <SectionList
            data={sections.map((section, index) => ({
              ...section,
              icon: section.icon ?? '',
              _id: index.toString(),
            }))}
            isDisabled={!isEditing}
            onUpdateList={handleUpdateSectionList}
          />
        )}
      </EditCard>
    </div>
  );
};
