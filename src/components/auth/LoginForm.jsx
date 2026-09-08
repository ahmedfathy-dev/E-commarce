import { useLanguage } from "../../context/LanguageContext";

export default function LoginForm({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitch,
  onClose,
}) {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSubmit} className="auth-form flex h-full flex-col justify-center px-6 py- sm:px-12">
      <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">{t("account")}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
        {t("welcomeBack")}
      </h2>
      <p className="mt-2 text-sm text-neutral-500">{t("loginAccount")}</p>

      <label className="mt-8 text-xs font-medium text-neutral-700">
        {t("email")}
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className="mt-2 w-full rounded-md border-[0.5px] border-[#ededed] bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
          placeholder="you@email.com"
        />
      </label>

      <label className="mt-4 text-xs font-medium text-neutral-700">
        {t("password")}
        <input
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          className="mt-2 w-full rounded-md border-[0.5px] border-[#ededed] bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
          placeholder="••••••••"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="mt-8 w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        {t("signIn")}
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="mt-4 text-sm text-neutral-500 transition hover:text-neutral-900"
      >
        {t("createAccount")}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="mt-2 text-sm text-neutral-400 hover:text-neutral-900"
      >
        {t("cancel")}
      </button>
    </form>
  );
}
