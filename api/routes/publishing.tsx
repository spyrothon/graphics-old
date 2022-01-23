import HTTPUtils from "../HTTPUtils";
import Endpoints from "../Endpoints";

import type { Newsletter, InitialNewsletter } from "../APITypes";

export async function fetchNewsletters() {
  return await HTTPUtils.get<Newsletter[]>(Endpoints.NEWSLETTERS);
}

export async function fetchNewsletter(newsletterId: string) {
  return await HTTPUtils.get<Newsletter>(Endpoints.NEWSLETTER(newsletterId));
}

export async function createNewsletter(newsletterData: InitialNewsletter) {
  return await HTTPUtils.post<Newsletter>(Endpoints.NEWSLETTERS, newsletterData);
}

export async function updateNewsletter(newsletterId: string, newsletterData: Partial<Newsletter>) {
  return await HTTPUtils.put<Newsletter>(Endpoints.NEWSLETTER(newsletterId), newsletterData);
}
