import TalentTokenTicker from "../../components/BrandedTalentShares";
import { useGetTalentQuery } from "../../app/authApi";
import React from "react";
const BrandedTalentSharesPage = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTalentQuery();
  const sortedTalent = React.useMemo(() => {
    const users = data?.taleUsers ?? [];
    const toNum = (v) =>
      v === 0 || v ? Number(String(v).replace(/,/g, "")) : 0;
    return [...users]
      .map((u) => ({ ...u, _net: toNum(u.networth) }))
      .sort((a, b) => b._net - a._net);
  }, [data]);
  return (
   <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12">
      <TalentTokenTicker
        talent={sortedTalent ?? []}
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRefresh={refetch}
      />
    </div>
    </section>
  );
};

export default BrandedTalentSharesPage;
