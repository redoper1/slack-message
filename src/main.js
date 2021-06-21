const Apify = require('apify');
const { WebClient } = require('@slack/web-api');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const { token, channel, text, blocks, threadId, unfurl } = await Apify.getValue('INPUT');

    const web = new WebClient(token);

    let unfurlLinks = unfurl === 'links' || unfurl === 'all'
        ? true : undefined;

    let unfurlMedia = unfurl === 'media' || unfurl === 'all' ? true : undefined;

    if (unfurl === 'false') {
        unfurlLinks = false;
        unfurlMedia = false;
    }

    const result = await web.chat.postMessage({
        text,
        channel,
        blocks,
        thread_ts: threadId,
        unfurl_links: unfurlLinks,
        unfurl_media: unfurlMedia,
    });


    log.info(`Successfully send message ${result.ts} in conversation ${channel}`);

    await Apify.setValue('OUTPUT', result);
});
