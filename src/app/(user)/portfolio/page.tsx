import PortfolioPage from "@/pages/PortfolioPage";
import { renderSeo } from "@/shared/renderSeo";

export const metadata = renderSeo({
  title: "Портфолио",
});

const page = () => {
  return <PortfolioPage />;
};

export default page;
