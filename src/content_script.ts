// import Viewer from 'viewerjs';

// 入口
(async function main() {
    let contentType = await getContentType(location.href);
    if (/^image/.test(contentType)) {
        console.log('当前页面纯图片格式')
        await run()
    }
})();


async function run() {
    // @ts-ignore
    loadCss('spotlight/spotlight.min.css');
    loadCss('spotlight/main.css');


    // let container = document.createElement('div');
    // document.body.appendChild(container);
    // container.appendChild(img);
    // let [realWidth, realHeight] = await getImgRealSize(img.src);
    let [realWidth, realHeight] = await getImgRealSize(location.href);

    // @ts-ignore
    Spotlight.show([{src: location.href}], {
        description: `${realWidth} *  ${realHeight}`,
        close: false,
        download: true,
    });

    // addViewerCss();
    // document.querySelector('img').classList.add('spotlight');
    // (document.body).innerHTML = `<img style="display:none" id="CHROME_EXTENSION_IMAGE_VIEWER" src="${location.href}">`;
    //
    // // @ts-ignore
    // const viewer = new Viewer(document.getElementById('CHROME_EXTENSION_IMAGE_VIEWER') as HTMLImageElement, {
    //     inline: true,
    //     navbar: false,
    //     button: false,
    //     minWidth: 300,
    //     minHeight: 300,
    //     loading: false,
    //     loop: false,
    //     viewed() {
    //         viewer.zoomTo(1);
    //     },
    //     toolbar: {
    //         zoomIn: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         zoomOut: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         oneToOne: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         reset: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         prev: false,
    //         play: false,
    //         next: false,
    //         rotateLeft: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         rotateRight: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         flipHorizontal: {
    //             show: 1,
    //             size: 'large',
    //         },
    //         flipVertical: {
    //             show: 1,
    //             size: 'large',
    //         },
    //     },
    // });

    function addViewerCss() {
        loadCss('spotlight/spotlight.min.css');
        // loadScript('viewer/jquery-viewer.min.js');
        // loadScript('viewer/viewer.min.js');
        // loadScript('viewer/jquery-viewer.min.js');
    }

    function loadCss(url: string) {
        let href = chrome.runtime.getURL(url);
        let el = document.createElement('link');
        el.href = href;
        el.rel = 'stylesheet';
        el.type = 'text/css';
        document.head.appendChild(el);
    }

    function loadScript(url: string) {
        let src = chrome.runtime.getURL(url);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }

    // 双击切换全屏
    // document.addEventListener('dblclick', e => {
    //     // 不知道为什么, 切换全屏时, chrome会重置img的cssText, 这里设置一个定时器重置一下
    //     let cssText = img.style.cssText;
    //     let _timer = setInterval(() => {
    //         if (img.style.cssText != cssText) {
    //             img.style.cssText = cssText;
    //             clearInterval(_timer);
    //         }
    //     }, 16);
    //
    //     chrome.runtime.sendMessage({
    //         action: 'toggleFullScreen'
    //     });
    // });

    // function initToastr() {
    //     require('../asset/css/toastr.css');
    //     let htm = `
    // 	<div style='display:none' id="toast-container" class="toast-top-right" aria-live="polite" role="alert">
    // 		<div class="toast" style="padding: 10px;">
    // 			<div class="toast-message" id="toast-message"></div>
    // 		</div>
    // 	</div>`;
    //     $('body').append($(htm));
    // }

}


/**
 * 根据图片地址, 获取真实大小
 *
 * @param {string} imgUrl
 * @returns [width, height]
 */
function getImgRealSize(imgUrl: string): Promise<[number, number]> {
    return new Promise(resolve => {
        let _img: HTMLImageElement = new Image();
        _img.src = imgUrl;
        _img.onload = () => {
            resolve([_img.width, _img.height]);
            _img.remove();
            (_img as any) = null;
        }
    })
}


/**
 * 根据资源地址, 获取contenttype
 *
 * @param {string} url
 * @returns [width, height]
 */
function getContentType(url: string): Promise<string> {
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let contentType = xhr.getResponseHeader("Content-Type") as string;
                resolve(contentType);
            }
        }
        xhr.send();
    })
}

