import { getDictionary, Locale } from "@/lib/dictionary-i18n";
import Test from "@/components/Test";

type HomeProps = {
  params: {
    lang: Locale;
  };
};

export default async function Page({ params: { lang } }: HomeProps) {
  const dict = await getDictionary(lang);

  return (
    <>
      <h1>{lang}</h1>
      <h2>Inside server: {dict.products.cart}</h2>
      <Test lang={dict.products.cart} />
    </>
  );
}
