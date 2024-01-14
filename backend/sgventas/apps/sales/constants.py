from enum import Enum


class PaymentMethod(Enum):

    DEBIT = 'DEBIT'
    CREDIT = 'CREDIT'
    CASH = 'CASH'
    TRANSFER = 'TRANSFER'
