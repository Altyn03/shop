import React from "react";
import styles from "./Main.module.scss";

const Main = () => {
    return (
        <section className={styles.main_page}>
            <div className={styles.main_page__block}>
                <img
                    className={styles.main_page__block_phone}
                    src="https://thumb.tildacdn.com/tild6464-6430-4439-b130-373036616133/-/format/webp/Group_364.png"
                    alt="phone"
                />
            </div>
            <div className={styles.main_page__block}>
                <div className={styles.main_page__block_info}>
                    <h1>Poizon в Telegram </h1>
                    <h3>
                        На все ваши вопросы с радостью ответим через наш ТГ
                        канал <a href="#">@poizonshop</a> заходи и подписывайся
                    </h3>
                    <div className={styles.hr}></div>
                    <h3>
                        Товары, которые вы увидите в каталоге,{" "}
                        <span>находятся в наличии </span> в нашем шоуруме в
                        Москве.
                        <br /> <span>Доставка по России - бесплатная!</span>
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default Main;
