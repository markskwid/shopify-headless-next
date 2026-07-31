import { groq } from "next-sanity";
import { internalLinkFields } from "./navigation";

export const FOOTER_SETTINGS_QUERY = groq`
    *[_type == "footerSettingsType"][0]{
        socialLinks,
        columns[]{
          _key,
          columnTitle,
          menu->{
            items[]{
                _type == "internalLink" => {
                    ${internalLinkFields}
                }
            }
          }
        }
    }
`;
