# SendIt workflows

## Text post

Example request: "Publish 'Our new release is available' to my LinkedIn account."

List accounts and identify the LinkedIn account.
Fetch its current platform requirements, then validate the exact text.
Preview when available and publish using the selected account and platform.
Return the actual post URL or ID from the tool result.

## Chat attachment

Example request: "Post this photo to Instagram with the caption 'A day at the coast'."

Create an upload session and give the user its returned upload URL.
After the upload, read the session and use its HTTPS media URL.
If several media files are returned, preserve the user's requested order and use the array fields supported by the selected publishing tool.
Do not replace an expired upload URL with a guessed URL; create a new upload session if the service reports expiry.
Validate caption and media together before publishing.

## Scheduled post

Example request: "Schedule this announcement for October 15 at 9 am America/Los_Angeles on LinkedIn."

Resolve the year from the user's context and ask if it is unclear.
Use the named IANA timezone to resolve the correct UTC offset for that date.
Validate the content and media, then schedule with the fields accepted by `schedule_content`.
Return the schedule ID, destination accounts, exact date, and local time with timezone.

## Multi-platform partial success

Validate against every requested platform.
When platform requirements differ, explain the needed adjustments before changing the user's intended message.
If one platform succeeds and another fails, report both outcomes.
Retry only the failed platform when the outcome is known and the user still wants that post published.
If the outcome is uncertain, inspect existing posts before any retry.

## Analytics

Example request: "How did my latest LinkedIn post perform?"

List accounts, select the requested account, and use the available analytics tool.
Report the metrics returned by SendIt with the relevant platform and time window.
Do not invent reach, engagement rates, or causal explanations absent from the result.
