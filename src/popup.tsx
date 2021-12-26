import React from "react";
import ReactDOM from "react-dom";

const styles = require("./popup.less");

interface INavItem {
    id: number,
    name: string,
    disable: boolean,
    icon: string
}

/**
 * 索引id的映射
 */
const NAV_ACTIVE_INDEX = {
    "PAGE_INFO": 0,
    "VIDEO_INFO": 1,
    "URL_MODES": 2,
}

const Popup = () => {

    return (
        <div id={'root'}>
            <div className={styles.root}>
                <div className={styles.navContainer}>
                    123
                </div>
                <div className={styles.showContainer}>
                    123
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(
    <React.Fragment>
        <Popup />
    </React.Fragment>,
    document.getElementById("root")
);
