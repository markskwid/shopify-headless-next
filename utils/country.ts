import { Country, State } from "country-state-city";

export const getCountryCodeByName = (name: string): string => {
  const country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );
  return country?.isoCode ?? "";
};

export const getCountryNameByCode = (isoCode: string): string => {
  return Country.getCountryByCode(isoCode)?.name ?? "";
};

export const getProvinceCodeByName = (
  countryCode: string,
  provinceName: string,
): string => {
  const province = State.getStatesOfCountry(countryCode).find(
    (p) => p.name.toLowerCase() === provinceName.toLowerCase(),
  );
  return province?.isoCode ?? "";
};

export const getProvinceNameByCode = (
  countryCode: string,
  provinceCode: string,
): string => {
  const province = State.getStatesOfCountry(countryCode).find(
    (p) => p.isoCode === provinceCode,
  );
  return province?.name ?? "";
};
