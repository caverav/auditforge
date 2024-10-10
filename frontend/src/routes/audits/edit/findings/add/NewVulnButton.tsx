import { t } from 'i18next';

import PrimaryButton from '../../../../../components/button/PrimaryButton';

const NewVulnButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="">
      <PrimaryButton onClick={onClick}>{t('newVulnerability')}</PrimaryButton>
    </div>
  );
};

export default NewVulnButton;
