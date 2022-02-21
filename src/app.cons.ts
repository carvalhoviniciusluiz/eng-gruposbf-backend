import { APP_BACKEND_API_URL_PROD } from '~/app.vars';

export const RELEVANCE = `
<h2>Eng-Gruposbf-Backend</h2>

<a href="${APP_BACKEND_API_URL_PROD}/api/" target="__blank">BACKEND_API;</a>
<pre>
API URL to access documentation:
  ${APP_BACKEND_API_URL_PROD}/api/
</pre>

<a href="${APP_BACKEND_API_URL_PROD}/v1/converter?value=1" target="__blank">Example_01;</a>
<pre>
API URL to access the values conversion endpoint
  ${APP_BACKEND_API_URL_PROD}/v1/converter?value=&lt;CASH_VALUE>
</pre>
`;
