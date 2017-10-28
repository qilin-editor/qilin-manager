// @flow
import {getOrganizationRepos} from "../utils/GitHubUtils";

/**
 * Asynchronously searches GitHub organization for repositories matching a
 * specified filter.
 *
 * @param   {string}    org
 * @param   {?string}   filter
 * @return  {Promise<Object>}
 * @async
 */
export default async function(org: string, filter?: string): Promise<Object> {
  return getOrganizationRepos(org, filter);
}
