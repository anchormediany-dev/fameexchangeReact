// import React, { useState } from "react";
// import { BiChevronDown } from "react-icons/bi";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// const countryData = {
//   "North America": [
//     {
//       code: "us",
//       name: {
//         en: "US (International)",
//         es: "EE.UU. (Internacional)",
//         fr: "États-Unis (International)",
//       },
//     },
//     { code: "jm", name: { en: "Jamaica", es: "Jamaica", fr: "Jamaïque" } },
//     { code: "ca", name: { en: "Canada", es: "Canadá", fr: "Canada" } },
//   ],
//   Europe: [
//     {
//       code: "gb",
//       name: { en: "United Kingdom", es: "Reino Unido", fr: "Royaume-Uni" },
//     },
//     { code: "fr", name: { en: "France", es: "Francia", fr: "France" } },
//     { code: "de", name: { en: "Germany", es: "Alemania", fr: "Allemagne" } },
//     { code: "gr", name: { en: "Greece", es: "Grecia", fr: "Grèce" } },
//     { code: "pt", name: { en: "Portugal", es: "Portugal", fr: "Portugal" } },
//     { code: "es", name: { en: "Spain", es: "España", fr: "Espagne" } },
//     {
//       code: "cz",
//       name: {
//         en: "Czech Republic",
//         es: "República Checa",
//         fr: "République tchèque",
//       },
//     },
//     { code: "se", name: { en: "Sweden", es: "Suecia", fr: "Suède" } },
//     { code: "is", name: { en: "Iceland", es: "Islandia", fr: "Islande" } },
//     { code: "ie", name: { en: "Ireland", es: "Irlanda", fr: "Irlande" } },
//     { code: "it", name: { en: "Italy", es: "Italia", fr: "Italie" } },
//     { code: "tr", name: { en: "Turkey", es: "Turquía", fr: "Turquie" } },
//     { code: "pl", name: { en: "Poland", es: "Polonia", fr: "Pologne" } },
//     { code: "ro", name: { en: "Romania", es: "Rumania", fr: "Roumanie" } },
//     { code: "ru", name: { en: "Russia", es: "Rusia", fr: "Russie" } },
//     { code: "ua", name: { en: "Ukraine", es: "Ucrania", fr: "Ukraine" } },
//     { code: "no", name: { en: "Norway", es: "Noruega", fr: "Norvège" } },
//     { code: "hu", name: { en: "Hungary", es: "Hungría", fr: "Hongrie" } },
//     { code: "fi", name: { en: "Finland", es: "Finlandia", fr: "Finlande" } },
//     { code: "dk", name: { en: "Denmark", es: "Dinamarca", fr: "Danemark" } },
//     { code: "al", name: { en: "Albania", es: "Albania", fr: "Albanie" } },
//     { code: "si", name: { en: "Slovenia", es: "Eslovenia", fr: "Slovénie" } },
//   ],
//   "Asia Pacific": [
//     { code: "au", name: { en: "Australia", es: "Australia", fr: "Australie" } },
//     {
//       code: "nz",
//       name: { en: "New Zealand", es: "Nueva Zelanda", fr: "Nouvelle-Zélande" },
//     },
//     { code: "hk", name: { en: "Hong Kong", es: "Hong Kong", fr: "Hong Kong" } },
//     {
//       code: "bd",
//       name: { en: "Bangladesh", es: "Bangladesh", fr: "Bangladesh" },
//     },
//     { code: "in", name: { en: "India", es: "India", fr: "Inde" } },
//     { code: "id", name: { en: "Indonesia", es: "Indonesia", fr: "Indonésie" } },
//     { code: "jp", name: { en: "Japan", es: "Japón", fr: "Japon" } },
//     {
//       code: "kr",
//       name: {
//         en: "Korea, Republic Of",
//         es: "Corea, República de",
//         fr: "Corée, République de",
//       },
//     },
//     { code: "my", name: { en: "Malaysia", es: "Malasia", fr: "Malaisie" } },
//     { code: "pk", name: { en: "Pakistan", es: "Pakistán", fr: "Pakistan" } },
//     {
//       code: "ph",
//       name: { en: "Philippines", es: "Filipinas", fr: "Philippines" },
//     },
//     {
//       code: "cn",
//       name: { en: "P.R. China", es: "R.P. China", fr: "R.P. Chine" },
//     },
//     { code: "sg", name: { en: "Singapore", es: "Singapur", fr: "Singapour" } },
//     { code: "th", name: { en: "Thailand", es: "Tailandia", fr: "Thaïlande" } },
//     { code: "vn", name: { en: "Vietnam", es: "Vietnam", fr: "Viêt Nam" } },
//   ],
//   "Latin America": [
//     { code: "ar", name: { en: "Argentina", es: "Argentina", fr: "Argentine" } },
//     { code: "br", name: { en: "Brazil", es: "Brasil", fr: "Brésil" } },
//     { code: "cl", name: { en: "Chile", es: "Chile", fr: "Chili" } },
//     { code: "co", name: { en: "Colombia", es: "Colombia", fr: "Colombie" } },
//     { code: "ec", name: { en: "Ecuador", es: "Ecuador", fr: "Équateur" } },
//     { code: "mx", name: { en: "Mexico", es: "México", fr: "Mexique" } },
//     { code: "pe", name: { en: "Peru", es: "Perú", fr: "Pérou" } },
//     { code: "uy", name: { en: "Uruguay", es: "Uruguay", fr: "Uruguay" } },
//   ],
//   Africa: [
//     {
//       code: "za",
//       name: { en: "South Africa", es: "Sudáfrica", fr: "Afrique du Sud" },
//     },
//     { code: "ke", name: { en: "Kenya", es: "Kenia", fr: "Kenya" } },
//   ],
// };

// // Language options with flags
// const languageOptions = [
//   { code: "en", name: "English" },
//   { code: "es", name: "Español" },
//   { code: "fr", name: "Français" },
// ];

// const CountrySelector = () => {
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryClick = (country) => {
//     setSelectedCountry(country);
//     // Here you would typically do something with the selected country
//     console.log(`Selected country: ${country.name[currentLanguage]}`);
//   };

//   return (
//     <section className="mt-20 flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow py-10  bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
//         <div className="text-white ">
//           <div className="container">
//             {Object.entries(countryData).map(([region, countries]) => (
//               <div key={region} className="mb-12">
//                 <h2 className="2xl:text-[50px] font-bold mb-4">{region}</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
//                   {countries.map((country) => (
//                     <button
//                       key={country.code}
//                       onClick={() => handleCountryClick(country)}
//                       className={`flex items-center hover:text-primary transition-colors duration-200 ${
//                         selectedCountry?.code === country.code
//                           ? "text-primary"
//                           : ""
//                       }`}
//                     >
//                       <img
//                         src={`https://flagcdn.com/w20/${country.code}.png`}
//                         srcSet={`https://flagcdn.com/w40/${country.code}.png 2x`}
//                         alt={`Flag of ${country.name[currentLanguage]}`}
//                         className="object-cover mr-5"
//                       />
//                       <span className="text-[25px] font-medium">
//                         {country.name[currentLanguage]}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer with Language Selector */}
//           <div className="flex container justify-end items-center">
//             <span className="mr-2 font-medium text-[30px]">
//               Language: &nbsp;
//             </span>
//             <div className="relative">
//               <button
//                 onClick={() =>
//                   setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
//                 }
//                 className="flex items-center space-x-2 bg-[#212121] px-7 w-[300px] py-[18px] rounded justify-between"
//               >
//                 <span>
//                   {
//                     languageOptions.find(
//                       (lang) => lang.code === currentLanguage
//                     ).name
//                   }
//                 </span>
//                 <BiChevronDown size={24} className="text-white" />
//               </button>

//               {isLanguageDropdownOpen && (
//                 <div className="absolute bottom-full right-0 mb-1 w-[300px] bg-[#212121] rounded shadow-lg overflow-hidden">
//                   {languageOptions.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => {
//                         setCurrentLanguage(lang.code);
//                         setIsLanguageDropdownOpen(false);
//                       }}
//                       className={`block w-full text-left px-3 py-2 hover:bg-gray-800 ${
//                         currentLanguage === lang.code
//                           ? "bg-gray-800 text-primary"
//                           : ""
//                       }`}
//                     >
//                       {lang.name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <button className="ml-4 bg-[#0B0B0B] px-10 py-[18px] rounded-[12px] text-primary text-[20px] font-bold">
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </section>
//   );
// };

// export default CountrySelector;
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const countryData = {
  "North America": [
    {
      code: "us",
      name: {
        en: "US (International)",
        es: "EE.UU. (Internacional)",
        fr: "États-Unis (International)",
      },
    },
    { code: "jm", name: { en: "Jamaica", es: "Jamaica", fr: "Jamaïque" } },
    { code: "ca", name: { en: "Canada", es: "Canadá", fr: "Canada" } },
  ],
  Europe: [
    {
      code: "gb",
      name: { en: "United Kingdom", es: "Reino Unido", fr: "Royaume-Uni" },
    },
    { code: "fr", name: { en: "France", es: "Francia", fr: "France" } },
    { code: "de", name: { en: "Germany", es: "Alemania", fr: "Allemagne" } },
    { code: "gr", name: { en: "Greece", es: "Grecia", fr: "Grèce" } },
    { code: "pt", name: { en: "Portugal", es: "Portugal", fr: "Portugal" } },
    { code: "es", name: { en: "Spain", es: "España", fr: "Espagne" } },
    {
      code: "cz",
      name: {
        en: "Czech Republic",
        es: "República Checa",
        fr: "République tchèque",
      },
    },
    { code: "se", name: { en: "Sweden", es: "Suecia", fr: "Suède" } },
    { code: "is", name: { en: "Iceland", es: "Islandia", fr: "Islande" } },
    { code: "ie", name: { en: "Ireland", es: "Irlanda", fr: "Irlande" } },
    { code: "it", name: { en: "Italy", es: "Italia", fr: "Italie" } },
    { code: "tr", name: { en: "Turkey", es: "Turquía", fr: "Turquie" } },
    { code: "pl", name: { en: "Poland", es: "Polonia", fr: "Pologne" } },
    { code: "ro", name: { en: "Romania", es: "Rumania", fr: "Roumanie" } },
    { code: "ru", name: { en: "Russia", es: "Rusia", fr: "Russie" } },
    { code: "ua", name: { en: "Ukraine", es: "Ucrania", fr: "Ukraine" } },
    { code: "no", name: { en: "Norway", es: "Noruega", fr: "Norvège" } },
    { code: "hu", name: { en: "Hungary", es: "Hungría", fr: "Hongrie" } },
    { code: "fi", name: { en: "Finland", es: "Finlandia", fr: "Finlande" } },
    { code: "dk", name: { en: "Denmark", es: "Dinamarca", fr: "Danemark" } },
    { code: "al", name: { en: "Albania", es: "Albania", fr: "Albanie" } },
    { code: "si", name: { en: "Slovenia", es: "Eslovenia", fr: "Slovénie" } },
  ],
  "Asia Pacific": [
    { code: "au", name: { en: "Australia", es: "Australia", fr: "Australie" } },
    {
      code: "nz",
      name: { en: "New Zealand", es: "Nueva Zelanda", fr: "Nouvelle-Zélande" },
    },
    { code: "hk", name: { en: "Hong Kong", es: "Hong Kong", fr: "Hong Kong" } },
    {
      code: "bd",
      name: { en: "Bangladesh", es: "Bangladesh", fr: "Bangladesh" },
    },
    { code: "in", name: { en: "India", es: "India", fr: "Inde" } },
    { code: "id", name: { en: "Indonesia", es: "Indonesia", fr: "Indonésie" } },
    { code: "jp", name: { en: "Japan", es: "Japón", fr: "Japon" } },
    {
      code: "kr",
      name: {
        en: "Korea, Republic Of",
        es: "Corea, República de",
        fr: "Corée, République de",
      },
    },
    { code: "my", name: { en: "Malaysia", es: "Malasia", fr: "Malaisie" } },
    { code: "pk", name: { en: "Pakistan", es: "Pakistán", fr: "Pakistan" } },
    {
      code: "ph",
      name: { en: "Philippines", es: "Filipinas", fr: "Philippines" },
    },
    {
      code: "cn",
      name: { en: "P.R. China", es: "R.P. China", fr: "R.P. Chine" },
    },
    { code: "sg", name: { en: "Singapore", es: "Singapur", fr: "Singapour" } },
    { code: "th", name: { en: "Thailand", es: "Tailandia", fr: "Thaïlande" } },
    { code: "vn", name: { en: "Vietnam", es: "Vietnam", fr: "Viêt Nam" } },
  ],
  "Latin America": [
    { code: "ar", name: { en: "Argentina", es: "Argentina", fr: "Argentine" } },
    { code: "br", name: { en: "Brazil", es: "Brasil", fr: "Brésil" } },
    { code: "cl", name: { en: "Chile", es: "Chile", fr: "Chili" } },
    { code: "co", name: { en: "Colombia", es: "Colombia", fr: "Colombie" } },
    { code: "ec", name: { en: "Ecuador", es: "Ecuador", fr: "Équateur" } },
    { code: "mx", name: { en: "Mexico", es: "México", fr: "Mexique" } },
    { code: "pe", name: { en: "Peru", es: "Perú", fr: "Pérou" } },
    { code: "uy", name: { en: "Uruguay", es: "Uruguay", fr: "Uruguay" } },
  ],
  Africa: [
    {
      code: "za",
      name: { en: "South Africa", es: "Sudáfrica", fr: "Afrique du Sud" },
    },
    { code: "ke", name: { en: "Kenya", es: "Kenia", fr: "Kenya" } },
  ],
};

// Language options with flags
const languageOptions = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

const CountrySelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    // Here you would typically do something with the selected country
    console.log(`Selected country: ${country.name[currentLanguage]}`);
  };

  return (
    <section className="mt-10 lg:mt-16 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow py-6 sm:py-8 lg:py-10 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="text-white">
          <div className="container px-4 mx-auto">
            {Object.entries(countryData).map(([region, countries]) => (
              <div key={region} className="mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-[50px] font-bold mb-3 lg:mb-4">
                  {region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 lg:gap-x-4 gap-y-2 sm:gap-y-3">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountryClick(country)}
                      className={`flex items-center hover:text-primary transition-colors duration-200 py-1 ${
                        selectedCountry?.code === country.code
                          ? "text-primary"
                          : ""
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${country.code}.png`}
                        srcSet={`https://flagcdn.com/w40/${country.code}.png 2x`}
                        alt={`Flag of ${country.name[currentLanguage]}`}
                        className="object-cover mr-3 sm:mr-4 lg:mr-5"
                      />
                      <span className="text-lg sm:text-xl lg:text-2xl xl:text-[25px] 2xl:text-[25px] font-medium truncate">
                        {country.name[currentLanguage]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer with Language Selector */}
          <div className="container px-4 mx-auto flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-6 sm:mt-0">
            <span className="mr-0 sm:mr-2 font-medium text-xl sm:text-2xl lg:text-[30px] 2xl:text-[30px] mb-3 sm:mb-0">
              Language: &nbsp;
            </span>
            <div className="relative w-full sm:w-auto mb-3 sm:mb-0 z-10">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center space-x-2 bg-[#212121] px-4 sm:px-5 lg:px-7 w-full sm:w-[220px] lg:w-[280px] xl:w-[300px] py-3 sm:py-4 lg:py-[18px] rounded justify-between"
              >
                <span className="text-base sm:text-lg lg:text-[20px]">
                  {
                    languageOptions.find(
                      (lang) => lang.code === currentLanguage
                    ).name
                  }
                </span>
                <BiChevronDown size={24} className="text-white" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute bottom-full right-0 mb-1 w-full sm:w-[220px] lg:w-[280px] xl:w-[300px] bg-[#212121] rounded shadow-lg overflow-hidden">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-800 text-base sm:text-lg ${
                        currentLanguage === lang.code
                          ? "bg-gray-800 text-primary"
                          : ""
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="w-full sm:w-auto sm:ml-4 bg-[#0B0B0B] px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-[18px] rounded-[12px] text-primary text-base sm:text-lg lg:text-[20px] font-bold">
              Update
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CountrySelector;
