describe('Проверка авторизации', function () {

    it('верный логин и верный пароль', function() {
        cy.visit('https://login.qa.studio/'); // перейти на страницу сайта
        cy.get('#mail').type('german@dolnikov.ru '); // ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввести правильный пароль
        cy.get('#loginButton').click(); // нажать кнопку "войти"
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверка сообщения об успешной авторизации
        cy.get('#messageHeader').should('be.visible'); // сообщение видно пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // перейти на страницу сайта
        cy.get('#forgotEmailButton').contains('Забыли пароль?'); // проверяем что есть надпись "Забыли пароль?"
        cy.get('#forgotEmailButton').should('be.visible'); // проверяем что енадпись "Забыли пароль?" видна пользователю
        cy.get('#forgotEmailButton').click(); // нажимаем "Забыли пароль?"
        cy.get('#forgotForm').should('be.visible'); // проверка что переход к форме восстановления пароля успешен
        cy.get('#mailForgot').type('german@dolnikov.ru'); // вводим почту
        cy.get('#restoreEmailButton').click(); // нажимаем кнопку "Отправить код"
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // провеяем что появилось сообщение об успешной отправки пароля на почту
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('неверный логин и верный пароль', function() {
        cy.visit('https://login.qa.studio/'); // перейти на страницу сайта
        cy.get('#mail').type('shortdead@yandex.ru'); // ввести неправильный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввести правильный пароль
        cy.get('#loginButton').click(); // нажать кнопку "войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверка сообщения об неуспешной авторизации
        cy.get('#messageHeader').should('be.visible'); // сообщение видно пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('верный логин и неверный пароль', function() {
        cy.visit('https://login.qa.studio/'); // перейти на страницу сайта
        cy.get('#mail').type('german@dolnikov.ru'); // ввести неправильный логин
        cy.get('#pass').type('iLoveqastudio'); // ввести неправильный пароль
        cy.get('#loginButton').click(); // нажать кнопку "войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверка сообщения об неуспешной авторизации
        cy.get('#messageHeader').should('be.visible'); // сообщение видно пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })

    it('проверка на приведение к строчным буквам в логине', function() {
        cy.visit('https://login.qa.studio/'); // перейти на страницу сайта
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввести логин с буквами в верхнем регистре
        cy.get('#pass').type('iLoveqastudio1'); // ввести правильный пароль
        cy.get('#loginButton').click(); // нажать кнопку "войти"
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверка сообщения об успешной авторизации
        cy.get('#messageHeader').should('be.visible'); // сообщение видно пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователя
    })
})


describe('e2e для Покемонов', function () {

    it('покупка нового автара для тренера', function() {
        cy.visit('HOST_NAME'); // перейти на страницу сайта
        cy.get('.login__content').should('be.visible'); // проверка что поле авторизации видно
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // ввести логин
        cy.get('#password').type('USER_PASSWORD'); // вводим пароль
        cy.get('.auth__button').click(); //нажимаем кнопку войти
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('.header__container > .header__id').click({force: true}); // нажать на кнопку перехода в профиль своего тренера
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('[href="/shop"]').click();
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('.available > button').first().click({ force: true }); // кликаем Купить у первого доступного аватара
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('.credit').type('4620869113632996'); // вводим номер карты
        cy.get('.k_input_ccv').type('125'); // вводим CVV карты
        cy.get('.k_input_date').type('1225'); // вводим срок действия карты
        cy.get('.k_input_name').type('NAME'); // вводим имя владельца действия карты
        cy.get('.pay-btn').click(); // нажимаем кнопку Оплатить
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('#cardnumber').type('56456'); // вводим код подтверждения СМС
        cy.get('.payment__submit-button').click(); // нажимаем кнопку Отправить
        cy.wait(2000); // ждём пока всё прогрузится
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверяем появление сообщения об успешной покупке
        cy.get('.payment__adv').click(); // нажимаем "Вернуться в битву покемонов"
    })

})