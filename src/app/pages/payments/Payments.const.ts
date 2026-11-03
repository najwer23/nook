import type { BalanceRefreshFlags } from './Payments.types';

export const BALANCE_REFRESH_IDLE: BalanceRefreshFlags = {
  credits: false,
  bankAccountNumber: false,
};

export const BALANCE_REFRESH_CREDITS: BalanceRefreshFlags = {
  credits: true,
  bankAccountNumber: false,
};
