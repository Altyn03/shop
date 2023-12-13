import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_block}>
                <img
                    src="https://static.tildacdn.com/tild6638-6663-4162-a333-396162323464/2022-09-20_232206.jpg"
                    alt="poizon"
                />
            </div>
            <div className={styles.footer_block}>
                <div className={styles.footer_block__social}>
                    <a href="#" className={styles.footer_block__social_icon}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className={styles.footer_block__social_icon}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className={styles.footer_block__social_icon}>
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <a href="#" className={styles.footer_block__confident}>
                    <h4>© Политика конфиденциальности</h4>
                </a>
            </div>
        </div>
    );
};

export default Footer;
