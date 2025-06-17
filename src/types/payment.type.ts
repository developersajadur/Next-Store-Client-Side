

export type TPaymentResponse = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    phone: string;
    email: string;
  };
  orderId: string;
  method: string;
 status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId: string;
  sp_order_id: string;
  amount: number;
  createdAt: string;
  updatedAt: string; 
  __v?: number;
  gatewayResponse: {
    id: number;
    order_id: string;
    currency: string;
    amount: number;
    payable_amount: number;
    discsount_amount: number | null;
    disc_percent: number;
    received_amount: string;
    usd_amt: number;
    usd_rate: number;
    is_verify: number;
    card_holder_name: string | null;
    card_number: string | null;
    phone_no: string;
    bank_trx_id: string;
    invoice_no: string;
    bank_status: 'Success' | 'failed' | 'Cancel' | string;
    customer_order_id: string;
    sp_code: string;
    sp_message: string;
    name: string;
    email: string;
    address: string;
    city: string;
    value1: string | null;
    value2: string | null;
    value3: string | null;
    value4: string | null;
    transaction_status: string | null;
    method: string;
    date_time: string;
  };
};


export type TPayment = {
  transactionId: string;
  method: string;
  status: "paid" | "pending" | "failed" | "refunded";
  amount: number;
  createdAt: string;
  gatewayResponse: {
    method: string;
  };
};

export type TPaymentMeta = {
  totalPayments: number;
  totalAmount: number;
  successRate: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
};

export type TPaymentHistoryResponse = {
  payments: TPayment[];
  meta: TPaymentMeta;
};
