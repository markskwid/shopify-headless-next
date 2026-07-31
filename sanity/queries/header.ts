import { groq } from "next-sanity";
import { internalLinkFields } from "./navigation";


export const HEADER_SETTINGS_QUERY = groq`
    *[_type == "headerSettings"][0]{
        mainMenu->{
          title,
          items[]{
             _type == "internalLink" => {
                ${internalLinkFields}
            }
          }
        }
    }
`