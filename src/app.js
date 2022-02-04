const Post = require('./post');
const pup = require('puppeteer');

module.exports = (() => {
    const _hashtagUrl = process.env.URL;

    const _openBrowser = async () => await pup.launch({
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
    });

    const _closeBrowser = async browser => {
        await browser.close();
    };

    const _createPage = async browser => await browser.newPage();

    const _openPage = async page => {
        await page.goto(_hashtagUrl, { waitUntil: 'networkidle2' });
        await _waitSelector(page, '.yQ0j1');
    };

    const _waitSelector = async (page, selector) => {
        await page.waitForSelector(selector);
    };

    const _wait = async (page, time) => {
        await page.waitFor(time);
    };

    const _getPosts = async page => {
        const posts = await page.$$('.FFVAD[src]');
        posts.splice(0, 9);

        return posts;
    };

    const _openModal = async (page, post) => {
        post.click();

        await _waitSelector(page, '.M9sTE ._97aPb');
        await _wait(page, 1000);
    };

    const _getItemUrl = async page => {
        let item = await page.$('._97aPb .tWeCl[src]');
        if (item == null) {
            item = await page.$('._97aPb .FFVAD[src]');
        }

        return page.evaluate(link => link.getAttribute('src'), item);
    };

    const _closeModal = async page => {
        await page.$eval('.TxciK .wpO6b', element => {
            element.click();
        });

        await page.waitFor(500);
    };

    const _getUrl = async (page, post) => {
        await _openModal(page, post);

        const url = await _getItemUrl(page);

        await _closeModal(page);

        return url;
    };

    const _savePost = async url => {
        const thisPost = await Post.findOne({ url });

        if (thisPost === null) {
            const video = url.includes('.mp4');

            await new Post({ url, video, local: false }).save();
        }
    };

    const init = async () => {
        const browser = await _openBrowser();
        const page = await _createPage(browser);

        await _openPage(page);

        const posts = await _getPosts(page);

        for (const i in posts) {
            await _savePost(await _getUrl(page, posts[i]));
        }

        await _closeBrowser(browser);
    };

    return { init };
})();
