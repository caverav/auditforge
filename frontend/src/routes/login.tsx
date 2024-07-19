import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";


export const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  return (
    <section className="bg-gray-800 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="/auditforgelogo.png"
          alt="Logo"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input
          id="email"
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder={t('email')}
        />
        <input
          id="password"
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder={t('password')}
        />
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-black hover:bg-gray-100 hover:text-black px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={() => login(
              (document.getElementById("email") as HTMLInputElement).value,
              (document.getElementById("password") as HTMLInputElement).value,
              ""
            )
            }
          >
            {t('login')}
          </button>
        </div>
      </div>
    </section>
  );
};

