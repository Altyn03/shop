import React from "react";
import styles from "./Contacts.module.scss";

const Contacts = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className={styles.contacts}>
            <h1>Есть вопросы? Мы всегда на связи!</h1>
            <div className={styles.contacts__info_form}>
                <div>
                    Телефон: +7 (999) 480 28 72 <br />
                    Телеграм: @altyn_O3 <br />
                    Почта: altynov.00@gmail.com
                    <h4>
                        Подпишитесь на наш телеграм канал, там вся самая свежая
                        информация о товарах и акциях
                    </h4>
                    <h4>
                        ИП Алтынов Алекс Олегович <br /> ИНН 7773221488
                    </h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.form_input_info}
                        type="text"
                        placeholder="Имя"
                    />
                    <input
                        className={styles.form_input_info}
                        type="text"
                        placeholder="Телефон"
                    />
                    <input
                        className={styles.form_input_info}
                        type="text"
                        placeholder="Телеграмм для связи, например @aleks"
                    />
                    <textarea placeholder="Опишите коротко суть обращения" />
                    <button type="submit" className={styles.button_submit}>
                        Отправить
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contacts;
