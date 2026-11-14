export const PROFFTEST_API = import.meta.env.VITE_PROFFTEST_API_URL || (import.meta.env.DEV
  ? '/api/public/proff-tests'
  : 'https://crm.consulteam.edu.kg/api/public/proff-tests');

export async function saveProffTestResult(submission, scores) {
  const response = await fetch(`${PROFFTEST_API}/${submission.id}/result`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Submission-Token': submission.result_token },
    body: JSON.stringify({ scores }),
  });
  if (!response.ok) throw new Error('result failed');
  return response.json();
}
