import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 h-full">
      <section className="home grid h-max pt-32 pb-16">
        <div className="home__container container grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center m-auto">
          <div className="home__data justify-self-center text-center lg:text-left">
            <p className="pb-2 font-semibold text-gray-300">Error 404</p>
            <h1 className="pb-4 text-5xl text-white font-bold lg:text-6xl">
              Not Found :(
            </h1>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-gray-300 py-4 px-8 font-bold"
              onClick={() => navigate(-1)}
              to="#"
            >
              {t('goBack')}
            </Link>
          </div>

          <div className="home__img justify-self-center">
            <img
              alt="home"
              className="w-64 animate-floting lg:w-[400px]"
              src="/logo.svg"
            />
            <div className="home__shadow mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64" />
          </div>
        </div>
      </section>
    </div>
  );
};
