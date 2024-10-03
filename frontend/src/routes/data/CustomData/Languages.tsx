import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../../components/button/PrimaryButton';
import EditCard from '../../../components/card/EditCard';
import SimpleInput from '../../../components/input/SimpleInput';
import {
  createLanguage,
  getLanguages,
  updateLanguages,
} from '../../../services/data';
import LanguageList from './LanguageList';

export const Languages: React.FC = () => {
  const { t } = useTranslation();
  const [newLanguage, setNewLanguage] = useState('');
  const [newLocale, setNewLocale] = useState('');

  const [languages, setLanguages] = useState<
    { language: string; locale: string }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data.datas);
        setLoading(false);
      } catch (err) {
        setError('Error fetching company');
        setLoading(false);
      }
    };

    void fetchLanguages();
  }, [isEditing]);

  const handleAddLanguage = async () => {
    let resp: { datas: { language: string; locale: string }; status?: string };
    if (!newLanguage.trim()) {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      setError(`${t('err.createEmptyField')}: ${t('name')}`);
      toast.error(`${t('err.createEmptyField')}: ${t('name')}`);
      return;
    }

    if (!newLocale.trim()) {
      setError(`${t('err.createEmptyField')}: ${t('locale')}`);
      toast.error(`${t('err.createEmptyField')}: ${t('locale')}`);
      return;
    }

    try {
      resp = await createLanguage({
        language: newLanguage,
        locale: newLocale,
      });
    } catch (error) {
      setError('Error creating language');
      toast.error(t('err.errorCreatingLang'));
      return;
    }
    toast.success(t('msg.languageCreatedOk'));
    setNewLanguage('');
    setNewLocale('');
    setLanguages(prevLanguages => [
      ...prevLanguages,
      { locale: resp.datas.locale, language: resp.datas.language },
    ]);
  };

  /**
   * Lógica para hacer uptdate (PUT)
   * de los lenguajes.
   */
  const [newLanguageList, setNewLanguageList] = useState<
    { language: string; locale: string }[]
  >([]);

  const handleUpdateLanguageList = useCallback(
    (data: { language: string; locale: string }[]) => {
      setNewLanguageList(data);
    },
    [setNewLanguageList],
  );

  const onClickSave = async () => {
    try {
      await updateLanguages(newLanguageList);
      toast.success(t('msg.languagesUpdatedOk'));
      setIsEditing(false);
    } catch (error) {
      setError('Error updating languages');
      toast.error(t('err.failedUpdateLanguages'));
      setIsEditing(false);
      return;
    }
  };

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SimpleInput
          id={t('language')}
          label={t('language')}
          name={t('language')}
          onChange={setNewLanguage}
          placeholder={t('language')}
          type="text"
          value={newLanguage}
        />
        <SimpleInput
          id={t('locale')}
          label={t('locale')}
          name={t('locale')}
          onChange={setNewLocale}
          placeholder={t('locale')}
          type="text"
          value={newLocale}
        />
        <div>
          <PrimaryButton onClick={handleAddLanguage}>+</PrimaryButton>
        </div>
      </div>
      <EditCard
        editTitle={t('tooltip.edit')}
        isEditing={isEditing}
        onClickCancel={() => setIsEditing(false)}
        onClickEdit={() => setIsEditing(true)}
        onClickSave={onClickSave}
        title={t('listOfLanguages')}
      >
        {loading ? (
          <p>{t('loading')}</p>
        ) : (
          <LanguageList
            data={languages}
            isDisabled={!isEditing}
            onUpdateList={handleUpdateLanguageList}
          />
        )}
      </EditCard>
    </div>
  );
};
