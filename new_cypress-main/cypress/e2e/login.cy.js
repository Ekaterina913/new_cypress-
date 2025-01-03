import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json";
import * as recovery_page from "../locators/recovery_password_page.json";
describe("Проверка авторизации", function () {
  beforeEach("Начало теста", function () {
    cy.visit("/"); ///Зайти на сайт
    cy.get(main_page.fogot_pass_btn).should(
      "have.css",
      "color",
      "rgb(0, 85, 152)"
    ); ///Проверяю цвет кнопки "забыли пароль"
  });
  afterEach("Конец теста", function () {
    cy.get(result_page.close).should("be.visible"); /// Есть крестик и он виден пользователю
  });

  it("Верный логин и верный пароль", function () {
    cy.get(main_page.email).type(data.login); ///Найти поле логин и ввести правильный логин
    cy.get(main_page.password).type(data.password); ///Найти поле пароль и вести правильный пароль
    cy.get(main_page.login_button).click(); ///Нажать войти

    cy.get(result_page.title).contains("Авторизация прошла успешно"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });

  it("Верный логин и НЕверный пароль", function () {
    cy.get(main_page.email).type(data.login); ///Найти поле логин и ввести правильный логин
    cy.get(main_page.password).type("iLoveqastudio10"); ///Найти поле пароль и вести НЕправильный пароль
    cy.get(main_page.login_button).click(); ///Нажать войти

    cy.get(result_page.title).contains("Такого логина или пароля нет"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });

  it("Неверный логин и верный пароль", function () {
    cy.get(main_page.email).type("ger@dolnikov.ru"); ///Найти поле логин и ввести НЕправильный логин
    cy.get(main_page.password).type(data.password); ///Найти поле пароль и вести правильный пароль
    cy.get(main_page.login_button).click(); ///Нажать войти

    cy.get(result_page.title).contains("Такого логина или пароля нет"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });
  it("Ошибка валидации", function () {
    cy.get(main_page.email).type("germandolnikov.ru"); ///Найти поле логин и ввести правильный логин
    cy.get(main_page.password).type(data.password); ///Найти поле пароль и вести правильный пароль
    cy.get(main_page.login_button).click(); ///Нажать войти

    cy.get(result_page.title).contains("Нужно исправить проблему валидации"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });
  it("Проверка логики восстановления пароля", function () {
    cy.get(main_page.fogot_pass_btn).click(); ///Нажать востановить пароль
    cy.get(recovery_page.email).type(data.login); ///Ввести почту для восстановления пароля
    cy.get(recovery_page.send_button).click(); ///Нажать отправить код

    cy.get(result_page.title).contains("Успешно отправили пароль на e-mail"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });
  it("Поведение к строчным буквам в логине", function () {
    cy.get(main_page.email).type("GerMan@Dolnikov.ru"); ///Найти поле логин и ввести логин с прописными и строчными
    cy.get(main_page.password).type(data.password); ///Найти поле пароль и вести правильный пароль
    cy.get(main_page.login_button).click(); ///Нажать войти

    cy.get(result_page.title).contains("Авторизация прошла успешно"); ///Проверка, что элемент содержит текст
    cy.get(result_page.title).should("be.visible"); ///Текст виден пользователю
  });
});
