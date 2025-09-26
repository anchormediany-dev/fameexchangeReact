import React, { useState } from "react";

import { useGetTalentOverviewQuery } from "../../app/authApi";
import { useParams } from "react-router-dom";
import ImageSwitchForAdmin from "./ImageSwitchForAdmin";

const FanProfileForAdmin = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTalentOverviewQuery(id, {
    skip: !id,
  });
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    // Keep focus on input after clearing
    const input = e.target.closest("form").querySelector("input");
    if (input) {
      input.focus();
    }
  };

  const handleInputBlur = (e) => {
    // Only blur if the click is outside the form
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleRecalculate = () => {
    console.log("Recalculating values...");
    // Add recalculation logic here
  };

  const handleTradingChart = () => {
    console.log("Opening trading chart...");
    // Add chart logic here
  };

  const handleImportFunds = () => {
    console.log("Importing more funds...");
    // Add import funds logic here
  };

  return (
    <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20"></div>
      <ImageSwitchForAdmin userData={data} />
    </section>
  );
};

export default FanProfileForAdmin;
