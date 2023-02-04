import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const HeadInfo = ({ title, description, image = "/logo.png" }: Props) => {
  return (
    <Helmet>
      <title>{title + " ⟪ 1-blue ⟫"}</title>
      <meta name="description" content={description} />

      {/* FIXME: URL 결정되면 수정 */}
      {/* <meta property="og:url" content="" /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content={title + "\n" + description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default HeadInfo;
