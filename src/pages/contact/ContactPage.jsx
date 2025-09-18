import React from "react";
import ContactForm from "../../components/contact/ContactUs";

const ContactPage = () => {
  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12  mt-10 lg:mt-16 2xl:mt-20">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
