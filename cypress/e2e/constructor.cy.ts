const constructor = '[data-cy=constructor]';
const burgerIngredient = '[data-cy=ingredient]';
const bunIngredient = "Флюоресцентная булка R2-D3";
const mainIngredient = "Филе Люминесцентного тетраодонтимформа";
const sauceIngredient = "Соус с шипами Антарианского плоскоходца";

describe('Тестирование конструктора бургеров', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
            'ingredients'
        );
        cy.visit('/');
        cy.wait('@ingredients');
    });
    it('Добавление булки в конструктор', () => {
        cy.get('div').contains('Выберите булки').should('exist');

        const bunsContainer = cy.get('h3').contains('Булки');
        const bun = bunsContainer.get(`li:contains(${bunIngredient})`);

        bun.within(() => {
            cy.get('button:contains(Добавить)').click();
        });

        cy.get(constructor).contains(`${bunIngredient}`).should('exist');

        cy.get(constructor).contains('Выберите булки').should('not.exist');
    });
    it('Добавление начинки в конструктор', () => {
        cy.get('div').contains('Начинки').should('exist');

        const mainsContainer = cy.get('h3').contains('Начинки');
        const main = mainsContainer.get(`li:contains(${mainIngredient})`);

        main.within(() => {
            cy.get('button:contains(Добавить)').click();
        });

        cy.get(constructor).contains(`${mainIngredient}`).should('exist');

        cy.get(constructor).contains('Выберите начинку').should('not.exist');
    });
    it('Добавление соуса в конструктор', () => {
        cy.get('div').contains('Соусы').should('exist');

        const saucesContainer = cy.get('h3').contains('Начинки');
        const sauce = saucesContainer.get(`li:contains(${sauceIngredient})`);

        sauce.within(() => {
            cy.get('button:contains(Добавить)').click();
        });

        cy.get(constructor).contains(`${sauceIngredient}`).should('exist');
    });
});

describe('Тестирование модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
            'ingredients'
        );
        cy.visit('/');
        cy.wait('@ingredients');
        window.localStorage.setItem('accessToken', 'token');
    });
    it('Открытие модального окна', () => {
        cy.contains('Детали ингредиента').should('not.exist');
        cy.get(burgerIngredient).contains(`${mainIngredient}`).click();
        cy.contains('Детали ингредиента').should('exist');
        cy.contains(`${mainIngredient}`).should('exist');
    });
    it('Закрытие модального окна (крестик)', () => {
        cy.get(burgerIngredient).contains(`${bunIngredient}`).click();
        cy.contains(`${bunIngredient}`).should('exist');
        const closeButton = cy.get('[data-cy=close-button]');
        closeButton.click();
        cy.contains('Детали ингредиента').should('not.exist');
    });
    it('Закрытие модального окна (оверлей)', () => {
        cy.get(burgerIngredient).contains(`${sauceIngredient}`).click();
        cy.contains(`${sauceIngredient}`).should('exist');
        const closeOverlay = cy.get('[data-cy=overlay]');
        closeOverlay.click({ force: true });
        cy.contains('Детали ингредиента').should('not.exist');
    });
});

describe('Тестирование оформления заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
            'ingredients'
        );
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
            'order'
        );
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.visit('/');
        cy.wait('@ingredients');
        window.localStorage.setItem('accessToken', 'token');
    });

    afterEach(() => {
        window.localStorage.removeItem('accessToken');
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    
    it('Оформление заказа', () => {
        cy.get(`${burgerIngredient}:contains(${bunIngredient})`).within(() => {
            cy.get('button:contains(Добавить)').click();
        });
        cy.get(constructor).contains(`${bunIngredient}`).should('exist');
        cy.get(`${burgerIngredient}:contains(${mainIngredient})`).within(() => {
            cy.get('button:contains(Добавить)').click();
        });
        cy.get(constructor).contains(`${mainIngredient}`).should('exist');
        cy.get(`${burgerIngredient}:contains(${sauceIngredient})`).within(() => {
            cy.get('button:contains(Добавить)').click();
        });
        cy.get(constructor).contains(`${sauceIngredient}`).should('exist');

        cy.get('[data-cy=order]').click();

        cy.wait('@order').then((cross) => {
            if (cross.response) {
                expect(cross.response.statusCode).to.equal(200);
            }
        })
        cy.contains('63907').should('exist');

        cy.get('[data-cy=close-button]').click();

        cy.contains('63907').should('not.exist');
        cy.get(constructor).contains('0').should('exist');
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
    });
});

