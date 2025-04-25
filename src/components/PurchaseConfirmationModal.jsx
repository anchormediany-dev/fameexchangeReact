import React, { useRef, useEffect } from "react";
import congratulationsPurchaseLogo from "../assets/images/congratulations-purchase-logo.png";

const PurchaseConfirmationModal = ({ isOpen, onClose }) => {
  const modalOverlayRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        modalOverlayRef.current &&
        event.target === modalOverlayRef.current
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-md  bg-opacity-50 cursor-pointer"
      ref={modalOverlayRef}
    >
      <div
        className="mx-auto max-w-[700px] p-8 relative bg-transparent rounded-xl cursor-default"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex w-full flex-col items-center mb-6">
          <div className=" rounded-full flex items-center justify-center mb-4">
            <img
              src={congratulationsPurchaseLogo}
              alt="Famecoin Logo"
              className=" object-cover w-40 h-40"
            />
          </div>
          <h2 className="text-xl font-bold text-white mb-2 text-center">
            CONGRATULATIONS
          </h2>
          <p className="text-sm text-white font-medium text-center">
            YOU HAVE JUST PURCHASED
          </p>
        </div>

        <div className="space-y-4 text-sm ">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-primary">FAMECOIN</span>
          </h2>
          <p className="text-primary">
            <span className="text-white">FAMECOIN PURCHASED:</span>
            1,000,000
          </p>
          <p className="text-primary">
            <span className="text-white">FAMECOIN HOLDERS NAME:</span>
            LIVINGSTON CARPIO
          </p>
          <p className="text-primary">
            <span className="text-white">DATE PURCHASED:</span>
            10/07/2021
          </p>
          <p className="text-primary">
            <span className="text-white">TIME:</span>
            0900 HRS EST
          </p>
          <p className="text-primary">
            <span className="text-white">METHOD OF PAYMENT:</span>
            MASTER CARD
          </p>
          <p className="text-primary">
            <span className="text-white">PURCHASED AMT:</span>
            $100,000,00 / ONE HUNDRED THOUSAND USD
          </p>
        </div>

        <div className="mt-6 text-sm text-white">
          <h3 className="text-primary font-bold mb-2">
            E-MAIL HAS JUST BEEN AS YOUR RECEIPT AND CONFIRMATION
          </h3>
          <p className="leading-relaxed font-medium text-xs">
            This E-Mail Transmission May Contain Confidential Or Legally
            Privileged Information That Is Exempt From Disclosure Under
            Applicable Law And Is Intended Only For The Individual Or Entity
            Named In The E-Mail Address. If You Copying, Ditribution, Or
            Reliance Upon The Contents Of This E-Mail Is Strictly Prohibited. If
            You Have Received This E-Mail Transmission In Error, Please Reply To
            The Sender, So That The Sender Can Arrange For Proper Delivery, And
            Then Please Delete The Message From Your Inbox. Thank You.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
