import { ArrowPathIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
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

export const ModelUpdateContainer = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
    setIsUpdateAvailable(true);
    const updateCWEHandler = async () => {
      try {
        setIsUpdating(true);
        const result = await updateCWEModel();
        if (result.status === 'success') {
          toast.success(t('msg.updateCWEModelOk'));
        } else {
          toast.error(t('err.updateCWEModelFailed'));
        }
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
          onClick={() => {
            !isUpdating && setIsOpenModal(true);
          }}
          type="button"
        >
          <HoverCard>
            <HoverCardTrigger>
              <ArrowPathIcon
                className={clsx('h-8 w-8 text-gray-100', {
                  'animate-spin': isUpdating,
                })}
              />
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
