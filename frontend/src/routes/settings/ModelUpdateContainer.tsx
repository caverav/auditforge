/* eslint-disable import/extensions */
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import Modal from '@/components/modal/Modal';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { checkUpdateCWE, updateCWEModel } from '@/services/settings';
import clsx from 'clsx';

export const ModelUpdateContainer = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const checkForUpdate = async () => {
      const result = await checkUpdateCWE();
      setIsOpenModal(!result);
    };
    void checkForUpdate();
  }, []);

  const onClickUpdate = () => {
    setIsOpenModal(false);

    const updateCWEHandler = async () => {
      try {
        setIsUpdating(true);
        await updateCWEModel();
        toast.success(t('msg.updateCWEModelOk'));
      } catch (err) {
        console.error(err);
        toast.error(t('err.updateCWEModelFailed'));
      } finally {
        setIsUpdateAvailable(false);
        setIsUpdating(false);
      }
    };
    void updateCWEHandler();
  };

  return (
    <>
      <Modal
        cancelText={t('btn.dismiss')}
        disablehr
        isOpen={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setIsUpdateAvailable(true);
        }}
        onSubmit={onClickUpdate}
        submitText={t('btn.update')}
        title={t('updateAvailable')}
      >
        {t('CWEModelUpdateText')}
      </Modal>
      {isUpdateAvailable ? (
        <button
          className={clsx(
            'fixed bottom-4 right-4 p-2 rounded-full inline-flex',
            {
              'bg-green-500': isUpdateAvailable,
              'bg-stone-500': isUpdating,
            },
          )}
          onClick={() => setIsOpenModal(true)}
          type="button"
        >
          <HoverCard>
            <HoverCardTrigger>
              <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-100" />
            </HoverCardTrigger>
            <HoverCardContent>
              {isUpdating ? t('updatingCWEModel') : t('updateAvailable')}
            </HoverCardContent>
          </HoverCard>
        </button>
      ) : null}
    </>
  );
};
