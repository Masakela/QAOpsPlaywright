Feature: Ecommerce validations

    Scenario Outline: Placing the Order
        Given a login to Ecommerce application with "<username>" and "<password>"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place Order
        Then Verify order is present in Order History

    Examples:
    | username               | password  |
    | something123@yahoo.com | Mdowdy79! |
    | layrock@yahoo.com      | Mdowdy79! |
    