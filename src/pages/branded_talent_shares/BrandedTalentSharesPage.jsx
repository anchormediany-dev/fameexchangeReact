import TalentTokenTicker from "../../components/BrandedTalentShares";
import { useGetTopTalentsQuery } from "../../app/tradingApi";
import React from "react";
const BrandedTalentSharesPage = () => {
  // Was previously useGetTalentQuery() (/user/get-talent) — that endpoint
  // returns EVERY role:"TALENT" user with no tier/qualification filter at
  // all, so unqualified futures-tier talents were showing up on this
  // public page. useGetTopTalentsQuery hits the same tier-filtered
  // (status:"active", tier:"tradeable") endpoint the home page's BTS
  // section already uses correctly.
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTopTalentsQuery({ sort: "bts", limit: 100 });
  const sortedTalent = React.useMemo(() => {
    const arr = data?.talents || data?.data?.talents || data?.data || [];
    return Array.isArray(arr) ? arr : [];
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
