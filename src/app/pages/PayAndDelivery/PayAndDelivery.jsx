import React from "react";
import styles from "./PayAndDelivery.module.scss";

const PayAndDelivery = () => {
    return (
        <section className={styles.delivery}>
            <h1>Доставка бесплатная</h1>
            <h2>
                Все товары, которые вы видите в каталоге, есть в наличии в
                Москве.
            </h2>
            <h2>
                Доставим в любую точку России за несколько дней через СДЭК или
                курьером по Москве в день заказа.
            </h2>
            <h2>
                Также вы можете забрать купленную пару самовывозом в МСК или
                приехать на примерку.
            </h2>
            <table className={styles.delivery_table}>
                <tbody>
                    <tr>
                        <td className={styles.delivery_table_td_main}>
                            Доставка СДЭК
                        </td>
                        <td className={styles.delivery_table_info}>
                            Большинство заказов в регионы мы отправляем через
                            СДЭК, вы можете выбрать удобный пункт выдачи или
                            заказать доставку лично в руки. Детали у вас уточнит
                            наш оператор после оформления заказа. Вы сможете
                            отслеживать заказ на всём пути следования. Для
                            этого, после фактической отправки посылки, мы вышлем
                            вам информацию, содержащую идентификатор (трекинг).
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.delivery_table_td_main}>
                            Оплата заказа картой
                        </td>
                        <td className={styles.delivery_table_info}>
                            Вы можете оплатить заказ банковской картой Visa /
                            Master Card. После оплаты мы свяжемся в вами по
                            телефону и договоримся о способе доставки. Отправка
                            произойдет на следующий день.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.hr}></div>
        </section>
    );
};

export default PayAndDelivery;
