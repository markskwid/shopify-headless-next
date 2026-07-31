import { groq } from "next-sanity";

export const internalLinkFields = groq`
    _key,
    _type,
    title,
    linkType,
    productHandle,
    collectionHandle,
    customPath
`;

export const menuQuery = groq`
  *[_type == "menu"][0]{
    title,
    items[]{
      _type == "internalLink" => {
        ${internalLinkFields}
      }
    }
  }
`;
